#!/bin/bash
# Import DoD root certificates into linux CA store


    # Location of bundle from DISA site
    bundle=https://dl.dod.cyber.mil/wp-content/uploads/pki-pke/zip/unclass-certificates_pkcs7_DoD.zip

    # Copy the Checksum file
    cp ./scripts/dod_ca_cert_bundle.sha256 /usr/local/share/ca-certificates/

    # Extract the bundle
    cd /usr/local/share/ca-certificates
    wget $bundle
    unzip unclass-certificates_pkcs7_DoD.zip

    # check that Checksums verify
    output=$(cd certificates_pkcs7_v5_12_dod; sha256sum -c --strict ../dod_ca_cert_bundle.sha256)
    echo $output
    if [[ "$output" == *"FAILED"* ]]; then
        echo "Checksum failed" >&2
        exit 1
    fi

    # Convert the PKCS#7 bundle into individual PEM files
    openssl pkcs7 -print_certs -in certificates_pkcs7_v5_12_dod/*_pem.p7b |
        awk 'BEGIN {c=0} /subject=/ {c++} {print > "cert." c ".pem"}'

    # Rename the files based on the CA name
    for i in *.pem; do
        name=$(openssl x509 -noout -subject -in $i |
               awk -F '(=|= )' '{gsub(/ /, "_", $NF); print $NF}'
        )
        mv $i ${name}.crt
    done

    # update certificate stores
    update-ca-certificates

    rm unclass-certificates_pkcs7_DoD.zip
