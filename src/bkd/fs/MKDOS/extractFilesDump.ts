import MKDOS from '@bkd/fs/MKDOS';
import MKDOSFile from './MKDOSFile';
import {encode} from 'base64-arraybuffer';
import {FILE_TYPES} from '@bkd/FileSystem';
import {IStructItem} from './createDisk';

interface IQueryStructItem {
    name: string;
    files?: 'all' | IQueryStructItem[]; // Пока по этому полю определяем, директория или нет
}

export const dumpStruct: IQueryStructItem[] = [
    {name: 'DOS', files: [
            {name: 'MONITOR'},
            {name: 'MKDOS V3.15'},
            {name: 'VD.SYS'},
            {name: 'VDISK.COM'},
            {name: 'MC'}
        ]},
    {name: 'MC', files: 'all'},
    {name: 'USER', files: 'all'}
];

export default function extractFilesDump(filesystem: MKDOS, files: IQueryStructItem[]): IStructItem[] {
    return files.map((queryFile: IQueryStructItem) => {
        const file = filesystem.getFileByName(queryFile.name, !!queryFile.files);
        if (queryFile.files === 'all') {
            return convertDir(file);
        }
        if (queryFile.files) {
            return {
                name: file.name,
                files: extractFilesDump(filesystem, queryFile.files)
            }
        }
        return convertFile(file);
    });
}

function convertDir(dir: MKDOSFile): IStructItem {
    const dirContent = dir.content as MKDOSFile[];
    const files: IStructItem[] = [
        ...dirContent.filter(file => file.type === FILE_TYPES.DIR).map(convertDir),
        ...dirContent.filter(file => file.type === FILE_TYPES.FILE).map(convertFile)
    ];
    return {
        name: dir.name,
        files
    };
}

function convertFile(file: MKDOSFile): IStructItem {
    return {
        name: file.name,
        address: file.address,
        content: encode(file.content as Uint8Array),
        isProtected: file.isProtected
    };
}
