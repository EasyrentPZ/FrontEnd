export class Announcement {
    constructor(
        public title: string = '', 
        public description: string = '',
        public id?: number,
        public issueDate?: Date, // Optional if not all announcements will have dates
        public status?: string // Optional if status can be null
    ) {}
}
