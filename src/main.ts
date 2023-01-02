const addAccount = () => {
    console.log("add");
}

const deleteAccount = (name: string) => {
    console.log(name);
}

const switchAccount = (name: string) => {
    console.log(name);
}

const help = () => {
    let text:string = "\x1b[1mCOMMANDS:\x1b[0m\n";

    text += "  Add current account to switch target.\n";
    text += "\x1b[34m    \"add <name>\"\x1b[0m or \x1b[34m\"-a <name>\"\x1b[0m\n";
    text += "    <name> is used to identify the account.\n\n";

    text += "  Delete the account named <name>.\n";
    text += "\x1b[34m    \"delete <name>\"\x1b[0m or \x1b[34m\"-d <name>\"\x1b[0m\n";
    text += "    Currently active accounts cannot be deleted.\n\n";

    text += "  Switching to <name>.\n";
    text += "\x1b[34m    \"switch <name>\"\x1b[0m or \x1b[34m\"-s <name>\"\x1b[0m\n\n";

    text += "  Print this message.\n";
    text += "\x1b[34m    \"help\"\x1b[0m or \x1b[34m\"-h\"\x1b[0m\n\n";

    text += "\x1b[1mREPOSITORY:\x1b[0m\n"
    text += "  https://github.com/rmuraix/clasp-switcher"

    console.log(text);
}

const main = (argument: string) => {
    switch (argument) {
        case "add":
        case "-a":
            addAccount();
            break;
        case "delete":
        case "-d":
            deleteAccount(process.argv[3]);
            break;
        case "switch":
        case "-s":
            switchAccount(process.argv[3]);
            break;
        case "help":
        case "-h":
            help();
            break;
        default:
            console.log("Invalid argument.\"help\" to see how to use it.")
            break;
    }
}

const argument: string = process.argv[2];
main(argument);