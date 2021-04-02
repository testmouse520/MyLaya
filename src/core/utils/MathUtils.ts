

/**
 * 
 */
module h5game {

    export class MathUtils extends BaseClass {

        /**
         * 角度转弧度。
         * @param   angle 角度值。
         * @return  返回弧度值。
         */
        toRadian(angle: number): number {
            return angle * Math.PI / 180;
        }

        /**
         * 弧度转换为角度。
         * @param   radian 弧度值。
         * @return  返回角度值。
         */
        toAngle(radian: number): number {
            return radian * 180 / Math.PI;
        }

        /**
         * 获取指定的两个点组成的线段的弧度值。
        * @param   x0 点一的 X 轴坐标值。
        * @param   y0 点一的 Y 轴坐标值。
        * @param   x1 点二的 X 轴坐标值。
        * @param   y1 点二的 Y 轴坐标值。
        * @return 弧度值。
        */
        getRotation(x0: number, y0: number, x1: number, y1: number): number {
            return Math.atan2(y1 - y0, x1 - x0) / Math.PI * 180;
        }

        /**
         * 两点间距离
         * @param {*} x0 
         * @param {*} y0 
         * @param {*} x1 
         * @param {*} y1 
         */
        calcDist(x0: number, y0: number, x1: number, y1: number): number {
            return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
        }
    }
}