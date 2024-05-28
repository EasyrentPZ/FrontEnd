export class Report {
    constructor(
        public id: number | null,
        public description: string,
        public status: string | null,
        public title: string,
        public notifierName: string | null,
        public notifierLastName: string | null,
        public date: Date | string | null
    ) {}
}
