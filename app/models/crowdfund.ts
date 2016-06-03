export class Crowdfund{
  constructor(
      /** 众筹项目ID */
    public crowdfundId : string,
    /** 众筹项目名称 */
    public  title : string,
    /** 众筹项目简单介绍 */
    public  describes : string,
    /** 众筹项目封面图 */
    public  crowdfundSurface : string,
    /** 开始预热时间 19 */
    public  preheatTime,
    /** 筹标时间 19 */
    public  orderTime,
    /** 众筹期限(到期未达目标金额则流标) 19 */
    public  limitTime,
    /** 0暂存 1预热 2进行中 3成功 4开始打款 5关闭打款,统计中 6完成 9失败 */
    public  step,
    /** 项目总金额(不作为流标依据,仅做展示) 11 */
    public borrowMoney,
    /** 当前认购额 */
    public currentMoney,
    /** 跟投人个数 */
    public followPerson
  ){}
}
