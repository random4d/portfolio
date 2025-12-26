import { MicroCMSDate, MicroCMSImage } from 'microcms-js-sdk';

export type Tag = {
    id: string;
    name: string;
} & MicroCMSDate;

export type Work = {
    id: string;
    title: string;
    content: string; // Rich Editor HTML
    thumbnail?: MicroCMSImage;
    tags: Tag[];
    url?: string;
} & MicroCMSDate;

export type About = {
    content: string;
} & MicroCMSDate;
