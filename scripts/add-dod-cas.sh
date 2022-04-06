#!/bin/bash
# Import DoD root certificates into linux CA store


    # Location of bundle from DISA site
    bundle=https://dl.dod.cyber.mil/wp-content/uploads/pki-pke/zip/certificates_pkcs7_DoD.zip

    # Extract the bundle
    cd /usr/local/share/ca-certificates
    wget $bundle
    unzip certificates_pkcs7_DoD.zip

    # Convert the PKCS#7 bundle into individual PEM files
    openssl pkcs7 -print_certs -in Certificates_PKCS7_v5.9_DoD/*.pem.p7b |
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

    rm certificates_pkcs7_DoD.zip