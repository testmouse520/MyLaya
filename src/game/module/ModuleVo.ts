

/**
 * 
 */
module game {

    /**
     * 
     */
    export class ModuleVo {

        private _sort: number;
        private _group: number;

        /** 配置开启 */
        private _configOpen: boolean;
        /** 本地开启 */
        private _localOpen: boolean = true;

        /** 图片开启 */
        private _iconOpen: boolean = false;

        constructor() {
        }

        /**
         * 是否飞图标
         */
        get isShowFlyIcon(): boolean {
            return this.hasOpen && this._iconOpen;
        }

        /**
         * 是否开启
         */
        get hasOpen(): boolean {
            return this._configOpen && this._localOpen;
        }

        /**
         * 组
         */
        get group(): number {
            return this._group;
        }

        /**
         * 顺序
         */
        get sort(): number {
            return this._sort;
        }
    }
}