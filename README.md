# Quitter - A program that quits

This program exits immediately with a specified exit code, or sends itself a
signal to induce an exit. Probably overkill for requirements, but too late now.

## Usage

```
Usage:
    quitter [-v|--verbose] [-e|--exit CODE] [-s|--signal NAME]

Options:
    -v, --verbose        Display some debug output
    -e, --exit CODE      Exit program with exit status CODE
    -s, --signal NAME    Send signal NAME to ourselves
```
