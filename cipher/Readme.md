# Summary

CLI tool that will encode and decode a text by 3 substitution ciphers
- Caesar cipher
- Atbash cipher
- ROT-8 as variation of ROT-13

# Installation

- clone this repository
- `cd` to the `/cipher/` folder of the cloned repository
- execute `npm install -g .`
- try to type `cipher`, it should print something angry in response

# Usage

`$ cipher -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"`
>input.txt This is secret. Message about "_" symbol!

>output.txt Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!

`$ cipher -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"`
>input.txt This is secret. Message about "_" symbol!

>output.txt Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!

`$ cipher -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"`
>input.txt This is secret. Message about "_" symbol!

>output.txt Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!

`$ cipher -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"`
>input.txt This is secret. Message about "_" symbol!

>output.txt This is secret. Message about "_" symbol!
