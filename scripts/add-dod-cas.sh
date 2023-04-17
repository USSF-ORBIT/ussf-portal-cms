#!/bin/bash
# Import DoD root certificates into linux CA store


    # Location of bundle from DISA site
    bundle=https://dl.dod.cyber.mil/wp-content/uploads/pki-pke/zip/unclass-certificates_pkcs7_DoD.zip
    # Copy the Checksum file
    cp ./scripts/certificates_pkcs7_v5_11_dod.sha256 /usr/local/share/ca-certificates/
    # Extract the bundle
    cd /usr/local/share/ca-certificates
    wget $bundle
    unzip unclass-certificates_pkcs7_DoD.zip

    # check that Checksums verify
    output=$(cd certificates_pkcs7_v5_11_dod; openssl smime -verify -in ../certificates_pkcs7_v5_11_dod.sha256 -inform DER -CAfile dod_pke_chain.pem | dos2unix | sha256sum -c)
    echo $output
    if [[ "$output" == *"FAILED"* ]]; then
        echo "Checksum failed" >&2
        exit 1
    fi

    # Convert the PKCS#7 bundle into individual PEM files
    openssl pkcs7 -print_certs -in certificates_pkcs7_v5_11_dod/*_pem.p7b |
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
