'use strict';

/**
 * 指定時間スリープする
 *
 * @remarks
 * Promise<void>を返す
 *
 * @param time スリープする時間（ms）
 */
export const do_sleep = (time: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve();
        }, time);
    });
}


/**
 * 文字列の日付をDate型に変換して返す
 *
 * @param dt_str 文字列の日付
 *
 * @example
 * ```
 * strdate2date("2019/6/27(Thu)")
 * ```
 *
 * @returns Date型の日付
 */
export const strdate2date = (dt_str: string) => {
    dt_str = dt_str.split('(')[0];
    const dts = dt_str.split('/');
    let dt = new Date;
    dt.setFullYear(Number(dts[0]));
    dt.setMonth(Number(dts[1])-1);
    dt.setDate(Number(dts[2]));
    return dt;
}