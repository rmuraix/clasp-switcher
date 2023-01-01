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
    console.log("help");
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