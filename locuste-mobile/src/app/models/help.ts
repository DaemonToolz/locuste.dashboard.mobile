export class HelpMeModel {
    public icon: string;
    public class: string;
    public content: string;
    public description: string;
    public comment : string;
    public icon_class: string;
    public is_custom: boolean
}

export enum HelpSections {
    main_menu,
    preview_view,
    console_view,
    statuses
}