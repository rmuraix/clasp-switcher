import * as fs from 'fs'
import * as path from 'path'

const getHomeDir = () => {
    return process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"];
}

const addAccount = (home: string, name: string) => {
    const clasprcPath = path.join(home, ".clasprc.json");

    // If the file exists, get its contents.
    let file = "";
    if (fs.existsSync(clasprcPath)) {
        file = fs.readFileSync(clasprcPath, "utf-8");
    } else {
        console.log(".clasprc.json does not exist. Are you not logged in to clasp?");
        process.exit(1);
    }

    const listPath = path.resolve(__dirname, "../.list");
    // If the directory does not exist, create it.
    if (!fs.existsSync(listPath)) {
        fs.mkdirSync(listPath);
    }
    // Copy the contents of the file to ../.list/<name>
    fs.writeFileSync(path.join(listPath, name), file);

    console.log("Current account added as switch target.");
}

const deleteAccount = (name: string) => {
    const listPath = path.resolve(__dirname, "../.list");
    const deleteTarget = path.join(listPath, name);

    // Delete
    if (fs.existsSync(deleteTarget)) {
        fs.unlinkSync(deleteTarget);
    } else {
        console.log("No such name exists for the switch target.");
        process.exit(1);
    }

    console.log(name + "removed from switch target.");
}

const switchAccount = (home: string, name: string) => {
    const listPath = path.resolve(__dirname, "../.list");

    const clasprcPath = path.join(home, ".clasprc.json");
    const listFilePath = path.join(listPath, name);

    // If the file exists, get its contents.
    let file = "";
    if (fs.existsSync(listFilePath)) {
        file = fs.readFileSync(listFilePath, "utf-8");
    } else {
        console.log("No such name exists for the switch target.");
        process.exit(1);
    }
    // Copy the contents of the file to /.clasprc.json
    fs.writeFileSync(clasprcPath, file);
    console.log("Switched to " + name);
}

const showList = () => {
    const listPath = path.resolve(__dirname, "../.list");

    if (!fs.existsSync(listPath)) {
        console.log("Switch target does not exist");
        process.exit(1);
    }

    fs.readdir(listPath, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
}

const help = () => {
    let text: string = "\x1b[1mCOMMANDS:\x1b[0m\n";

    text += "  Add current account to switch target.\n";
    text += "\x1b[34m    \"add <name>\"\x1b[0m or \x1b[34m\"-a <name>\"\x1b[0m\n";
    text += "    <name> is used to identify the account.\n\n";

    text += "  Delete the account named <name>.\n";
    text += "\x1b[34m    \"delete <name>\"\x1b[0m or \x1b[34m\"-d <name>\"\x1b[0m\n";
    text += "    Currently active accounts cannot be deleted.\n\n";

    text += "  Switching to <name>.\n";
    text += "\x1b[34m    \"switch <name>\"\x1b[0m or \x1b[34m\"-s <name>\"\x1b[0m\n\n";

    text += "  List targets\n";
    text += "\x1b[34m    \"list\"\x1b[0m or \x1b[34m\"-l\"\x1b[0m\n\n";

    text += "  Print this message.\n";
    text += "\x1b[34m    \"help\"\x1b[0m or \x1b[34m\"-h\"\x1b[0m\n\n";

    text += "\x1b[1mREPOSITORY:\x1b[0m\n"
    text += "  https://github.com/rmuraix/clasp-switcher"

    console.log(text);
}

const main = (argument: string) => {
    const home = getHomeDir() || "";
    switch (argument) {
        case "add":
        case "-a":
            addAccount(home, process.argv[3]);
            break;
        case "delete":
        case "-d":
            deleteAccount(process.argv[3]);
            break;
        case "switch":
        case "-s":
            switchAccount(home, process.argv[3]);
            break;
        case "list":
        case "-l":
            showList();
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