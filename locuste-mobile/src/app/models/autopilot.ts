export class SchedulerSummarizedData {
	public drone_name : string;
	public is_active : boolean;
	public is_manual : boolean;
	public is_simulated : boolean;
	public is_running : boolean;
	public is_ready : boolean;
	public is_busy : boolean;
}

export class DroneSummarizedStatus {
	public drone_name : string;
	public is_preparing : boolean;
	public is_moving : boolean;
	public is_hovering : boolean;
	public is_landed : boolean;
	public is_going_home : boolean;
	public is_home_ready : boolean;
	public is_gps_ready : boolean;
}