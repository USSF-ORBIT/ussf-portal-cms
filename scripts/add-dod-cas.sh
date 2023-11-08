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
    mv certificates_pkcs7_v5_*_dod/* ./

    # check that Checksums verify
    output=$(sha256sum -c --strict ../dod_ca_cert_bundle.sha256)
    echo $output
    if [[ "$output" == *"FAILED"* ]]; then
        echo "Checksum failed" >&2
        exit 1
    fi

    # Convert the PKCS#7 bundle into individual PEM files
    for i in *.p7b; do
        openssl pkcs7 -in $i -inform der -print_certs -out $i.pem
    done

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
