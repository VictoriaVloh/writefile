import * as fs from 'fs';

type WriteResult =
    | { mode: 'Append', prevContents: string }
    | { mode: 'Create', prevContents?: string }


async function readFile(filepath: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, result) => {
            if (err) {
                return reject(err)
            }
            resolve(result)
        })
    })
}

"./file.txt"
async function saveToFile(filePath: string, data: string): Promise<WriteResult> {
    if (fs.existsSync(filePath)) {
        const dataa = (await readFile(filePath)).toString()
        return { mode: "Append", prevContents: dataa }
    }
    else
        fs.writeFileSync(filePath, data)
    return { mode: "Create", prevContents: data }
}

//const first = saveToFile('./file.txt', " Ipsum Olerum blah blah......")


async function writeAutoDelete(filePath: string, data: string, timeout: number) {
    const promise = await saveToFile(filePath, data)
    if (promise.mode == "Create") {
        setTimeout(() => {
            fs.unlink(filePath, (err) => {
                if (err) throw  err;
                console.log('file was deleted');
            })
        }, timeout)
    }

    if (promise.mode == "Append") {
        setTimeout(() => {
           
        }, timeout)
    }
}

//saveToFile('./txt.file', 'Lorem Ipsum blahhhh')

writeAutoDelete('./txt.file', "hahhhhahah  ", 10000)