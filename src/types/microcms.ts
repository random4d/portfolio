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
    date?: string; // ISO date string for sorting/display
} & MicroCMSDate;

export type About = {
    content: string;
    content2?: string;
} & MicroCMSDate;

export type Performance = {
    id: string;
    fieldId: 'performance';
    event_date: string;
    event_title: string;
    description: string;
    event_link?: string;
    works_link?: Work;
} & MicroCMSDate;

export type Exhibition = {
    id: string;
    start_date: string;
    end_date?: string;
    exhibition_title: string;
    exhibition_link?: string;
    works_link?: Work;
} & MicroCMSDate;
