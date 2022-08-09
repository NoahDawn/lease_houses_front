// 初始的房源数据
import { dateCodeChange, differDays } from "common/Utils"

export default function houseData() {
    // 声明基本属性(houseName、houseType、location、direction、area、floor、roomType、rent、detail)
    let houseList = [ // 房源数据
        {
            // 房源: 1
            houseName: '康平公寓',
            houseType: '公寓',
            location: '江苏省常州市金坛区东城街道兆歧村',
            direction: '东',
            area: 120,
            floor: 4,
            roomType: '3室1厅1卫',
            rent: 5000,
            detail: '闲暇时可以去岭南公园玩，公园里有湖庭建筑。',
            rentCount: 3,
            leaseType: 'single',
            intermediaryId: 1,
            state: 1,
            ifLeased: 1
        },
        {
            // 房源: 2
            houseName: '滨江兰亭',
            houseType: '别墅',
            location: '江苏省扬州市高邮市临泽镇维扬路',
            direction: '南',
            area: 200,
            floor: 2,
            roomType: '4室2厅2卫',
            rent: 18000,
            detail: '整个别墅规模很大，交通便利，配套齐全，业主暂时用不到。',
        },
        {
            // 房源: 3
            houseName: '市光三村',
            houseType: '住宅',
            location: '安徽省亳州市利辛县永兴镇桥前李庄',
            direction: '西南',
            area: 180,
            floor: 2,
            roomType: '5室1厅2卫',
            rent: 5190,
            detail: '低密度社区，居住环境好，开方式住宅。',
        },
        {
            // 房源: 4
            houseName: '盛世豪园',
            houseType: '别墅',
            location: '上海市闵行区华漕镇万博家园',
            direction: '西',
            area: 200,
            floor: 1,
            roomType: '5室2厅3卫',
            rent: 12500,
            detail: '开发商精装修，房东配实木家具，风格新颖，房东爱护有加居住舒心。',
        },
        {
            // 房源: 5
            houseName: '高德公寓',
            houseType: '公寓',
            location: '陕西省渭南市韩城市板桥镇相里石',
            direction: '北',
            area: 80,
            floor: 20,
            roomType: '3室1厅1卫',
            rent: 3000,
            detail: '夜景很好，环境舒适安静，周围无闹市。',
            shelfTime: 64
        },
        {
            // 房源: 6
            houseName: '龙荣林',
            houseType: '公寓',
            location: '内蒙古自治区阿拉善盟阿拉善左旗嘉尔嘎勒赛汉镇',
            direction: '西南',
            area: 140,
            floor: 18,
            roomType: '4室1厅2卫',
            rent: 6000,
            detail: '水电暖气齐全。',
            rentCount: 4,
            leaseType: 'single',
            intermediaryId: 1,
            state: 1,
            ifLeased: 1
        },
        {
            // 房源: 7
            houseName: '临江水原',
            houseType: '商住房',
            location: '甘肃省定西市通渭县榜罗镇旧庄里',
            direction: '东',
            area: 180,
            floor: 6,
            roomType: '6室2厅3卫',
            rent: 10000,
            detail: '可用于举办个人画展，可供50人举办派对。',
        },
        {
            // 房源: 8
            houseName: '庆华圆居楼',
            houseType: '商品房',
            location: '四川省绵阳市平武县锁江羌族乡石门',
            direction: '西',
            area: 210,
            floor: 2,
            roomType: '5室2厅3卫',
            rent: 20000,
            detail: '房间采光不错，二楼顶有小花园。',
        },
        {
            // 房源: 9
            houseName: '荷兰风庄园',
            houseType: '住宅',
            location: '四川省阿坝藏族羌族自治州红原县龙日镇',
            direction: '南',
            area: 170,
            floor: 2,
            roomType: '5室1厅2卫',
            rent: 30000,
            detail: '周围有小溪，大草原。',
        },
        {
            // 房源: 10
            houseName: '海潮居',
            houseType: '别墅',
            location: '广东省湛江市雷州市纪家镇角湾村',
            direction: '北',
            area: 300,
            floor: 2,
            roomType: '8室3厅4卫',
            rent: 44000,
            detail: '环海，安全措施保证，可举办篝火晚会。',
            rentCount: 10,
            leaseType: 'single',
            intermediaryId: 1,
            state: 1,
            ifLeased: 1
        },
        {
            // 房源: 11
            houseName: '艾琳小区',
            houseType: '小区民宿',
            location: '广东省茂名市信宜市平塘镇桥埇',
            direction: '东',
            area: 80,
            floor: 4,
            roomType: '3室1厅1卫',
            rent: 2700,
            detail: '隔音效果好，周围很安静，采光不错，离闹市远。',
        },
        {
            // 房源: 12
            houseName: 'loft公寓',
            houseType: '公寓',
            location: '广东省江门市恩平市沙湖镇沙帽顶',
            direction: '南',
            area: 120,
            floor: 5,
            roomType: '2室1厅1卫',
            rent: 2600,
            detail: '上下两层，提供暖气，电子锁。',
        },
        {
            // 房源: 13
            houseName: '莎天居民楼二期',
            houseType: '住宅',
            location: '江西省赣州市寻乌县文峰乡老虎寨',
            direction: '南',
            area: 140,
            floor: 16,
            roomType: '4室1厅2卫',
            rent: 4700,
            detail: '房间暖色调，设施配备齐全。',
        },
        {
            // 房源: 14
            houseName: '菲克大厦',
            houseType: '写字楼',
            location: '江西省赣州市瑞金市瑞林镇坝背',
            direction: '东',
            area: 600,
            floor: 16,
            roomType: '12室2厅2卫',
            rent: 70000,
            detail: '所处开发区，软件开发中心。',
        },
        {
            // 房源: 15
            houseName: '希潮居',
            houseType: '别墅',
            location: '江西省九江市都昌县大树乡洞陂山许家',
            direction: '西',
            area: 200,
            floor: 2,
            roomType: '5室1厅2卫',
            rent: 20000,
            detail: '晚上海风很舒服。',
        },
        {
            // 房源: 16
            houseName: '睿江小区',
            houseType: '小区民宿',
            location: '浙江省金华市武义县白姆乡朱宅',
            direction: '西南',
            area: 120,
            floor: 13,
            roomType: '3室1厅2卫',
            rent: 4000,
            detail: '地段气温稳定，楼层适中，夏天不会潮湿，冬天不会干燥。',
            rentCount: 3,
            leaseType: 'single',
            intermediaryId: 1,
            state: 1,
            ifLeased: 1
        },
        {
            // 房源: 17
            houseName: '睿江小区',
            houseType: '小区民宿',
            location: '浙江省温州市永嘉县碧莲镇章当',
            direction: '西南',
            area: 120,
            floor: 13,
            roomType: '3室1厅2卫',
            rent: 4000,
            detail: '地段气温稳定，楼层适中，夏天不会潮湿，冬天不会干燥。',
        },
        {
            // 房源: 18
            houseName: '桂冠锦城',
            houseType: '小区民宿',
            location: '江苏省无锡市锡山区东港镇园溪路',
            direction: '东',
            area: 150,
            floor: 6,
            roomType: '7室1厅2卫',
            rent: 8000,
            detail: '周围有景点山区和人工湖，小区安静无杂音。',
            rentCount: 5,
            leaseType: 'together',
            intermediaryId: 1,
            state: 0,
            ifLeased: 1
        },
        {
            // 房源: 19
            houseName: '沃尔特三期',
            houseType: '商品房',
            location: '江苏省无锡市宜兴市高塍镇滆湖路',
            direction: '西北',
            area: 200,
            floor: 1,
            roomType: '4室1厅1卫',
            rent: 7700,
            detail: '坐落在人工湖面，四周环绕水，气温恒定。',
            destroyTime: '2021-02-24 08:00:00',
            shelfTime: 64
        },
        {
            // 房源: 20
            houseName: '德尔克公寓',
            houseType: '公寓',
            location: '安徽省合肥市肥东县古城镇小徐庄',
            direction: '西南',
            area: 160,
            floor: 5,
            roomType: '4室1厅1卫',
            rent: 5200,
            detail: '四周安静无杂音，周围娱乐设施俱全。',
        },
        {
            // 房源: 21
            houseName: '尚文轰趴',
            houseType: '商品房',
            location: '河南省商丘市永城市酇阳镇吴庄村',
            direction: '北',
            area: 200,
            floor: 1,
            roomType: '5室1厅1卫',
            rent: 6200,
            detail: '随时开派对，不会影响周遭。',
        },
        {
            // 房源: 22
            houseName: '爱德华公寓',
            houseType: '公寓',
            location: '山东省泰安市岱岳区良庄镇西庄',
            direction: '南',
            area: 150,
            floor: 9,
            roomType: '4室1厅2卫',
            rent: 4800,
            detail: '落地窗，采光很好，视野宽阔。',
        },
        {
            // 房源: 23
            houseName: '恒琴公寓',
            houseType: '公寓',
            location: '山东省东营市河口区孤岛镇韩家屋子',
            direction: '东南',
            area: 170,
            floor: 2,
            roomType: '4室1厅2卫',
            rent: 5200,
            detail: '设施配备齐全，暖光，视野良好，周围有公园。',
            rentCount: 5,
            leaseType: 'single',
            intermediaryId: 4,
            state: 1,
            ifLeased: 1
        },
        {
            // 房源: 24
            houseName: '韵轮小区207号',
            houseType: '小区民宿',
            location: '天津市宝坻区大白庄镇八道沽环路',
            direction: '东南',
            area: 130,
            floor: 14,
            roomType: '3室1厅2卫',
            rent: 4000,
            detail: '木制家具，采光很好。',
            destroyTime: '2021-02-24 08:00:00',
            shelfTime: 64
        },
        {
            // 房源: 25
            houseName: '锦航公寓',
            houseType: '公寓',
            location: '北京市顺义区南彩镇江南渠二路',
            direction: '东',
            area: 210,
            floor: 2,
            roomType: '5室1厅2卫',
            rent: 7700,
            detail: '房内宽阔有地毯，设施齐全，视野宽广出行方便。',
            rentCount: 6,
            leaseType: 'together',
            intermediaryId: 4,
            state: 1,
            ifLeased: 1
        },
        {
            // 房源: 26
            houseName: '尹晨小区143号',
            houseType: '小区民宿',
            location: '北京市密云区冯家峪镇何西路',
            direction: '东',
            area: 140,
            floor: 6,
            roomType: '4室1厅2卫',
            rent: 6700,
            detail: '房内装修有风格，房主个人设置了类似吧台的厨房。',
        },
        {
            // 房源: 27
            houseName: '恒天嘉园',
            houseType: '商品房',
            location: '内蒙古自治区锡林郭勒盟多伦县蔡木山乡',
            direction: '西',
            area: 230,
            floor: 6,
            roomType: '6室2厅2卫',
            rent: 12000,
            detail: '装修有参考法式设计，顶楼储物间空旷宽阔，有大量挂画。',
        },
        {
            // 房源: 28
            houseName: '华腾公寓',
            houseType: '公寓',
            location: '辽宁省葫芦岛市建昌县八家子镇老王家',
            direction: '北',
            area: 100,
            floor: 14,
            roomType: '3室1厅1卫',
            rent: 2500,
            detail: '装修很好，隔音很强，设施配备齐全。',
            rentCount: 1,
            leaseType: 'together',
            intermediaryId: 4,
            state: 0,
            ifLeased: 1
        },
        {
            // 房源: 29
            houseName: '鑫林小区453号',
            houseType: '小区民宿',
            location: '辽宁省锦州市义县头道河满族乡西五台村',
            direction: '东',
            area: 120,
            floor: 17,
            roomType: '4室1厅1卫',
            rent: 3200,
            detail: '装修很好，隔音很强，设施配备齐全。',
        },
        {
            // 房源: 30
            houseName: '天华佳苑',
            houseType: '商品房',
            location: '辽宁省大连市庄河市塔岭镇林家沟',
            direction: '南',
            area: 230,
            floor: 1,
            roomType: '8室2厅2卫',
            rent: 12000,
            detail: '设计风格有特色，拱形门，长走廊，适合办展览。',
        },
        {
            // 房源: 31
            houseName: '枫叶村15号',
            houseType: '住宅',
            location: '甘肃省张掖市肃南裕固族自治县马蹄藏族乡',
            direction: '北',
            area: 170,
            floor: 2,
            roomType: '5室1厅2卫',
            rent: 7000,
            detail: '四周环枫树林，环境安静无杂音。',
        },
        {
            // 房源: 32
            houseName: '东能嘉园',
            houseType: '别墅',
            location: '青海省果洛藏族自治州达日县莫坝乡',
            direction: '南',
            area: 230,
            floor: 1,
            roomType: '6室1厅2卫',
            rent: 8200,
            detail: '周围草地环绕，有小庭院，可以种植植物，视野宽广。',
            rentCount: 6,
            leaseType: 'single',
            intermediaryId: 2,
            state: 1,
            ifLeased: 1
        },
        {
            // 房源: 33
            houseName: '金家小区302号',
            houseType: '小区民宿',
            location: '四川省成都市郫都区唐昌镇唐玉路',
            direction: '东南',
            area: 80,
            floor: 1,
            roomType: '2室1厅1卫',
            rent: 2400,
            detail: '市中心，娱乐设施齐全，离地铁近。',
        },
        {
            // 房源: 34
            houseName: '蔚蓝科技园3栋4号',
            houseType: '商品房',
            location: '四川省凉山彝族自治州甘洛县斯觉镇',
            direction: '西北',
            area: 300,
            floor: 1,
            roomType: '7室2厅2卫',
            rent: 14500,
            detail: '开发区，设施配备齐全，装修近现代风。',
        },
        {
            // 房源: 35
            houseName: '安徒生公寓',
            houseType: '公寓',
            location: '贵州省毕节市赫章县雉街彝族苗族乡新店子',
            direction: '北',
            area: 140,
            floor: 7,
            roomType: '3室1厅1卫',
            rent: 5000,
            detail: '装修风格参考外国设计，采光不错。',
        },
        {
            // 房源: 36
            houseName: '海能居',
            houseType: '别墅',
            location: '甘肃省庆阳市正宁县永正镇正宁连接线',
            direction: '南',
            area: 330,
            floor: 1,
            roomType: '8室3厅4卫',
            rent: 24500,
            detail: '可以看见日升日落，环海，风景好，视野宽阔。',
        },
        {
            // 房源: 37
            houseName: '穆德公寓',
            houseType: '公寓',
            location: '山西省大同市左云县小京庄乡魏家沟村',
            direction: '西南',
            area: 150,
            floor: 1,
            roomType: '4室1厅2卫',
            rent: 3000,
            detail: '近现代风格装修。',
        },
        {
            // 房源: 38
            houseName: '星水空间',
            houseType: '商住房',
            location: '北京市大兴区国家新媒体产业基地广平大街31号',
            direction: '西南',
            area: 220,
            floor: 1,
            roomType: '6室1厅2卫',
            rent: 9000,
            detail: '有个人办公室，住房办公兼具。',
        },
        {
            // 房源: 39
            houseName: '苍林公寓',
            houseType: '公寓',
            location: '安徽省亳州市蒙城县小涧镇035乡道',
            direction: '南',
            area: 170,
            floor: 3,
            roomType: '4室1厅2卫',
            rent: 6000,
            detail: '落地窗，采光很好，周围有森林公园。',
        }
    ]

    // 扩展关键属性(id、owner、ownerId、phone、picture、collectCount)
    function extendKeyMessage() {
        for (let index = 0; index < houseList.length; index++) {
            houseList[index].id = (index + 1) // 扩展id

            houseList[index].picture = 'http://127.0.0.1:8050/picture/house/house_' + (index + 1) + '_1.jpg;http://127.0.0.1:8050/picture/house/house_' + (index + 1) + '_2.jpg;http://127.0.0.1:8050/picture/house/house_' + (index + 1) + '_3.jpg' // 扩展图片路径

            houseList[index].collectCount = Math.round(Math.random() * 4000) // 扩展收藏人数

            // 扩展户主属性
            if (index >= 0 && index < 20) {
                houseList[index].owner = '张三'
                houseList[index].ownerId = 1
                houseList[index].phone = 15181098638
            } else if (index >= 20 && index < 30) {
                houseList[index].owner = '李四'
                houseList[index].ownerId = 2
                houseList[index].phone = 17639286457
            } else if (index >= 30 && index < 40) {
                houseList[index].owner = '王五'
                houseList[index].ownerId = 3
                houseList[index].phone = 18930275628
            }
        }
    }

    // 扩展租赁属性(houseInspection、leaseTerm、occupancy)
    function extendLeaseMessage() {
        extendKeyMessage()

        let createTime = dateCodeChange(new Date('2021-12-22 10:31:16'))

        for (let index = 0; index < houseList.length; index++) {

            let flag = Math.floor(Math.random() * 10); //可均衡获取0到10的随机整数
            houseList[index].occupancy = (flag % 2) === 0 ? '随时入住' : '待清理后' // 扩展入住情况
            houseList[index].houseInspection = (flag % 2) === 0 ? '提前预约' : '当天实勘' // 扩展预约情况

            const realIndex = index + 1
                // 略过已出租房源
            if (realIndex !== 1 && realIndex !== 6 && realIndex !== 10 && realIndex !== 16 && realIndex !== 18 &&
                realIndex !== 23 && realIndex !== 25 && realIndex !== 28 && realIndex !== 32) {
                houseList[index].leaseType = (flag % 2) === 0 ? 'single' : 'together' // 扩展出租类型
                houseList[index].rentCount = 0 // 扩展租赁人数
                houseList[index].state = 0 // 扩展房源状态
                houseList[index].ifLeased = 0 // 扩展出租状态
            }

            houseList[index].createTime = createTime // 扩展创建时间
                // 略过失效房源
            if (realIndex !== 5 && realIndex !== 19 && realIndex !== 24) {
                houseList[index].destroyTime = '2022-11-18 08:00:00' // 扩展逾期时间
                houseList[index].shelfTime = differDays('2021-12-22 10:31:16', '2022-11-18 08:00:00') // 扩展上架天数
            }

            // 扩展租赁周期
            if (index >= 0 && index < 10) {
                houseList[index].leaseTerm = '月' // 扩展出租周期
                houseList[index].intermediaryId = 1 // 扩展经纪人编号
            } else if (index >= 10 && index < 20) {
                houseList[index].leaseTerm = '季度' // 扩展出租周期
                houseList[index].intermediaryId = 1 // 扩展经纪人编号
            } else if (index >= 20 && index < 30) {
                houseList[index].leaseTerm = '半年' // 扩展出租周期
                houseList[index].intermediaryId = 4 // 扩展经纪人编号
            } else if (index >= 30 && index < 40) {
                houseList[index].leaseTerm = '一年' // 扩展出租周期
                houseList[index].intermediaryId = 2 // 扩展经纪人编号
            }
        }

        return houseList
    }

    return extendLeaseMessage()
}