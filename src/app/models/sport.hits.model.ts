export class SportHits{
  public id? : number;
  public userId?: number;
  public createDate?:Date;
  public hitType?: number;
  public pointsHit?:number;
  public pointsEarn?:number;
  public hitsState?: boolean;
  public finalyResult?:boolean;
  public state?:boolean;
  public SportHitsDetails!:any[];
}