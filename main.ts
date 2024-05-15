enum Num {
    //% block="1"
    P1,
    //% block="2"
    P2,
    //% block="3"
    P3,
    //% block="4"
    P4,
    //% block="5"
    P5,
    //% block="6"
    P6,
    //% block="7"
    P7,
    //% block="8"
    P8,
    //% block="9"
    P9,
}
enum Sensor {
    //% block="Light"
    Light,
    //% block="Click"
    Click,
    //% block="Joystick"
    Joystick,
    //% block="Angle"
    Angle,
    //% block="Push"
    Push,
    //% block="ASR"
    ASR,
    //% block="Title"
    Title,
    //% block="Touch"
    Touch,
    //% block="TEMP&HUM"
    TEMPHUM,
    //% block="Distance"
    Distance,
    //% block="Soil Moisture"
    SoilMoisture,
    //% block="Gesture"
    Gesture,
}
enum Outunit  {
    //% block="All"
    All,
    //% block="舵机"
    Servo,
    //% block="直流电机"
    Motor,
    //% block="双路直流电机"
    Motorx2,
    //% block="Led8x8"
    Led8x8,
    //% block="LED_RGB"
    LedRGB,
    //% block="Mp3"
    Mp3,
}
enum OutEvent {
    //% block="1"
    Event1,
    //% block="2"
    Event2,
    //% block="3"
    Event3,
    //% block="4"
    Event4,
    //% block="5"
    Event5,
    //% block="6"
    Event6,
    //% block="7"
    Event7,
    //% block="8"
    Event8,

}
enum Led8x8Dh3 {
    //% block="熄灭"
    Off,
    //% block="点亮"
    On,
}
enum Led8x8Dh {
    //% block="随机"
    DH1,
    //% block="环绕"
    DH2,
    //% block="折弯"
    DH3,
    //% block="扫描"
    DH4,
    //% block="直接"
    DH5,
}
enum Led8x8Dh2 {
    //% block="向左"
    Left,
    //% block="向右"
    Right,
    //% block="变化"
    Change,
}
enum LedRGBDh {
    //% block="无"
    Wu,
    //% block="渐变"
    Change,
}
enum Mp3Dh {
    //% block="暂停"
    Dh0,
    //% block="播放"
    Dh1,
    //% block="下一曲"
    Dh2,
    //% block="上一曲"
    Dh3,
    //% block="Vol+"
    Dh4,
    //% block="Vol-"
    Dh5,
    //% block="OneStop"
    Dh6,
    //% block="单曲循环"
    Dh7,
    //% block="全局播放"
    Dh8,
    //% block="随机播放"
    Dh9,
}
enum MotorDh {
    //% block="正转"
    Right,
    //% block="反转"
    Left,
}



/**
 * Blocks for Blinkit Board
 */
//% weight=100 color=#0855AA icon="\uf0ca" block="BLINKIT"
namespace Blinkit {
    //let s3: string
    let blinkitten_sensor: number[][] = [];
    for (let i = 0; i < 20; i++) {
        blinkitten_sensor[i] = [];
        for (let j = 0; j < 9; j++) {
            blinkitten_sensor[i][j] = 0;
        }
    }
    let Led8x8_matrix: string[] = ["00", "00", "00", "00", "00", "00", "00", "00"];
    /**
     * BLINKIT initialize
     */
    //% blockId="BLINKIT_Serial_init" block="初始化BLINKIT"
    //% weight=100 blockGap=8
    //% parts=BLINKIT_Serial trackArgs=0
    export function init() {
        serial.redirect(
            SerialPin.P8,
            SerialPin.P12,
            BaudRate.BaudRate9600
        )
        basic.pause(200);
    }

    /**
    * normal2 driver blocks  ok
    * @param normal2 which normal2 to turn on
    * @param dir which direction to go
    */
    //% blockId=normal2
    //% block="指定%OutmodeName|Direct Drive %Sc"
    //% Sc.min=0 Sc.max=180
    export function normal2(OutmodeName: Outunit, Value: number): void {
        if (OutmodeName == 0) {
            const Value2 = Value / 10 + 48; // ASCII码对应
            Value = Value % 10;
            const char = asciiToChar(Value2);
            let projectInfo = "7e41" + char + Value + "#";
            serial.writeString(projectInfo);
        }
        else {
            const OutName = OutmodeName + 96; // ASCII码对应
            const Value2 = Value / 10 + 48; // ASCII码对应
            Value = Value % 10;
            const char = asciiToChar(OutName);
            const char2 = asciiToChar(Value2);
            let projectInfo = "7e54" + char + char2 + Value + "#";
            serial.writeString(projectInfo);
        }
    }

    /**
    * normal driver blocks   ok
    * @param normal which normal to turn on
    * @param Sc is the number will be show, eg: 1
    */
    //% blockId=normal
    //% block="指定%OutmodeName|触发 %Sc"
    //% Sc.min=1 Sc.max=8
    export function normal(OutmodeName: Outunit, Event: number): void {
        if (OutmodeName == 0) {
            //Outmode = Outmode + 1; // ASCII码对应
            //let projectInfo = "7e30" + Outmode + "#";
            let projectInfo = "7e30" + Event + "#";
            serial.writeString(projectInfo);
        }
        else {
            const OutName = OutmodeName + 96; // ASCII码对应
            //Outmode = Outmode + 1; // ASCII码对应
            const char = asciiToChar(OutName);
            //let projectInfo = "7e43" + char + Outmode + "#";


            let projectInfo = "7e43" + char + Event + "#";
            serial.writeString(projectInfo);
        }
    }

    /**
            * Sensor driver blocks 
            * @param Sensor which Sensor to turn on
            * @param dir which direction to go
            * @param speed how fast
            */
    //% blockId=Sensor_value_auto
    //% block="更新BLINKIT传感器状态"
    export function Sensor_refresh(): void {
        //let s: string
        let c = serial.read();
        if(c!=-1)
        {
            // let s: string = ""
            // while (c != 10) {
            //     s = s + asciiToChar(c)
            //     basic.pause(3)
            //     c = serial.read();
            // }
            // basic.showString(s)
            // basic.pause(150)
            // basic.clearScreen()

            let s: string = asciiToChar(c) + serial.readUntil(serial.delimiters(Delimiters.NewLine))//从串口读取 直到回车 A0=123          
                       
            let length: number = s.length;
            if (length > 3 && s[2] == "=") {
                let value_s: string = ""
                for (let index = 3; index < length; index++) {  //A0=1 23
                    value_s += s[index]
                }
                let value_n: number = +value_s;
                // basic.showNumber(value_n)
                // basic.pause(150)
                // basic.clearScreen()
                let a: number = s.charCodeAt(0) - 65
                let b: number = +s[1]
                if (a >= 0 && b >= 0 && value_n >= 0) {
                    blinkitten_sensor[a][b] = value_n
                }
            }
            //basic.pause(10);
        }       
    }


    /**
            * Sensor driver blocks 
            * @param Sensor which Sensor to turn on
            * @param dir which direction to go
            * @param speed how fast
            */
    //% blockId=Sensor_value
    //% block="获取%SensorName|%PosNum|数据"
    //获取传感器数值 存入数组中
    export function Sensor_re(SensorName: Sensor, PosNum: Num): void {
        SensorName = SensorName + 65;
        const char = asciiToChar(SensorName);
        let projectInfo = "7e4" + char + PosNum + "0#"
        serial.writeString(projectInfo)

        // let s: string = ""
        // s = serial.readUntil(serial.delimiters(Delimiters.NewLine))//从串口读取 直到回车 A0=123
        // let length: number = s.length;
        // //if (length > 3) {
        // if (s[2] == '=') {
        //     let value_s: string = ""
        //     for (let index = 3; index < length; index++) {  //A0=123
        //         value_s += s[index]
        //     }
        //     let valus_n: number = +value_s;
        //     let a: number = s.charCodeAt(0) - 65
        //     let b: number = +s[1]
        //     if (a >= 0 && b >= 0 && valus_n >= 0) {
        //         blinkitten_sensor[a][b] = valus_n
        //     }
        // }
    }


    function asciiToChar(asciiCode: number): string {
        // 使用String.fromCharCode方法将ASCII码转换为字符  
        return String.fromCharCode(asciiCode);
    }


    /**
    * Led8x8 driver blocks   ok
    * @param Led8x8 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_off
    //% block="Led_8x8%PosNum| 清空屏幕, 动画%Dh"
    export function Led8x8(PosNum: Num , Dh: Led8x8Dh): void {
        let projectInfo = "7e5d" + PosNum + "0" + Dh + "#"
        serial.writeString(projectInfo);
    }

    /**
    * Led8x8 driver blocks    ok
    
    * @param Led8x8 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    * @param s is the text will be show, eg: 'Hello!'
    * @param speed is the number will be show, eg: 1
    */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_String
    //% block="Led_8x8%PosNum|显示文本%s|动画%Dh|速度%speed"
    //% speed.min=1 speed.max=6
    export function Led8x8_1(PosNum: Num, s: string, Dh: Led8x8Dh2, speed: number ): void {
        let Wv = 48 + Dh * 10 + speed;
        let length: number = s.length + 53; //48+5
        const char = asciiToChar(length);
        const char2 = asciiToChar(Wv);
        let projectInfo = "7e" + char + "d" + PosNum + 1 + char2 + s + "#";
        serial.writeString(projectInfo);
    }

    /**
    * Led8x8 driver blocks    ok
    
    * @param Led8x8 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    * @param L is the number will be show, eg: 1
    * @param H is the number will be show, eg: 1
    */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_onoff
    //% block="Led_8x8%PosNum|坐标X:%L|坐标Y:%H|%Dh"
    //% L.min=1 L.max=8
    //% H.min=1 H.max=8
    export function Led8x8_3(PosNum: Num, L: number, H: number, Dh: Led8x8Dh3): void {
        let L_n = L + H * 8 - 9 + 48;
        const char = asciiToChar(L_n);
        let projectInfo = "7e6d" + PosNum + "3" + Dh + char + "#";
        serial.writeString(projectInfo);
    }

    /**
    * Led8x8 driver blocks    ok  
    * @param Led8x8 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    * @param L_l is the number will be show, eg: 1
    * @param L_h is the number will be show, eg: 1
    * @param L_l2 is the number will be show, eg: 1
    * @param L_h2 is the number will be show, eg: 1
    */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_move
    //% block="Led_8x8%PosNum 熄灭|坐标X:%L1坐标Y:%H1|点亮|坐标X:%L2坐标Y:%H2"
    //% L1.min=1 L1.max=8
    //% H1.min=1 H1.max=8
    //% L2.min=1 L2.max=8
    //% H2.min=1 H2.max=8
    export function Led8x8_4(PosNum: Num, L1: number, H1: number, L2: number, H2: number): void {
        let L_n = L1 + H1 * 8 - 9 + 48;
        let L_n2 = L2 + H2 * 8 - 9 + 48;
        const char = asciiToChar(L_n);
        const char2 = asciiToChar(L_n2);
        let projectInfo = "7e6d" + PosNum + "4" + char + char2 + "#";
        serial.writeString(projectInfo);
    }

    /**
    * Led8x8 driver blocks    ok
    
    * @param Led8x8 which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    * @param s is the text will be show, eg: '10101010'
    */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_matrix
    //% block="Led_8x8 行%Dh|显示%s"
    //% speed.min=1 speed.max=6
    export function Led8x8_5(Dh: OutEvent , s: string): void {
        let yas;
        let temp = 0;
        let nn:number = 0 ;
        for (let i = 7; i >= 0; i--)
        {
            yas = 1;
            for (let j = 1; j <= 7 - i ; j++)
            {
                yas = yas * 2;
            }
            nn = +s[i]
            if(nn!=0)
            {
                nn = 1
            }
            temp = temp + nn * yas;
        }
        Led8x8_matrix[Dh] = asciiToChar(48 + temp / 10) + temp % 10

    }



    /**
        * Led8x8 driver blocks    ok
        * @param Led8x8 which Led8x8 to turn on
        * @param dir which direction to go
        * @param speed how fast
        */
    //% subcategory="Led_8x8"
    //% blockId=Led8x8_String_play
    //% block="Led_8x8%PosNum显示图像, 动画%Dh"
    export function Led8x8_6(PosNum: Num, Dh: Led8x8Dh): void {
        let projectInfo = "7eEd" + PosNum + 2 + Dh + Led8x8_matrix[0] + Led8x8_matrix[1] + Led8x8_matrix[2] + Led8x8_matrix[3] + Led8x8_matrix[4] + Led8x8_matrix[5] + Led8x8_matrix[6] + Led8x8_matrix[7] + "#";
        serial.writeString(projectInfo);
    }

    /**
    * LedRGB driver blocks
    * @param LedRGB which Led8x8 to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Led_RGB"
    //% blockId=Led_RGB
    //% block="Led_RGB%PosNum|颜色R %Red|G %Green|B %Blue|动画%Dh"
    //% speed.min=1 speed.max=6
    //% Red.min=0 Red.max=255
    //% Green.min=0 Green.max=255
    //% Blue.min=0 Blue.max=255
    export function LedRGB(PosNum: Num, Red: number, Green: number, Blue: number, Dh: LedRGBDh): void {
        Dh = Dh + 1;    // ASCII码对应
        const Red1 = Red % 10;
        Red = Red / 10 + 48;
        const Green1 = Green % 10;
        Green = Green / 10 + 48;
        const Blue1 = Blue % 10;
        Blue = Blue / 10 + 48;
        const char = asciiToChar(Red);
        const char2 = asciiToChar(Green);
        const char3 = asciiToChar(Blue);
        let projectInfo = "7e:e" + PosNum + Dh + char + Red1 + char2 + Green1 + char3 + Blue1 + "#";
        serial.writeString(projectInfo);
    }

    /**
    * Player driver blocks   ok!
    * @param Player which Player to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Player"
    //% blockId=Player
    //% block="Player%PosNum|%Dh"
    export function Player(PosNum: Num, Dh: Mp3Dh): void {
        let projectInfo = "7e4f" + PosNum + Dh + "#"
        serial.writeString(projectInfo);
    }

    /**
    * Player driver blocks   ok!
    * @param Player which Player to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Player"
    //% blockId=Player_2
    //% block="Player%PosNum|设置音量%Vol"
    //% Vol.min=0 Vol.max=28
    export function Player_2(PosNum: Num, Vol: number): void {
        const asciiCode = Vol + 48; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let projectInfo = "7e5f" + PosNum + ";" + char + "#"
        serial.writeString(projectInfo);
    }

    /**
* Player driver blocks   ok!
* @param Player which Led8x8 to turn on
* @param dir which direction to go
* @param speed how fast
* @param Xq is the number will be show, eg: 1
*/
    //% subcategory="Player"
    //% blockId=Player_3
    //% block="Player%PosNum|播放第 %Xq|首"
    //% Xq.min=1 Xq.max=10
    export function Player_3(PosNum: Num, Xq: number): void {
        const asciiCode = Xq + 48; // ASCII码对应
        const char = asciiToChar(asciiCode);
        let projectInfo = "7e5f" + PosNum + ":" + char + "#"
        serial.writeString(projectInfo);
    }

    /**
        * Servo driver blocks   ok!
        
        * @param Servo_1 which Servo_1 to turn on
        * @param dir which direction to go
        * @param speed how fast
        */
    //% subcategory="Servo"
    //% blockId=Servo
    //% block="Servo_180%PosNum|转到%Sc|速度 %speed"
    //% Sc.min=0 Sc.max=180
    //% speed.min=0 speed.max=8
    export function Servo_360(PosNum: Num, Sc: number, speed: number): void {
        const Sc2 = Sc % 10;
        Sc = Sc / 10 + 48; // ASCII码对应
        const char = asciiToChar(Sc);
        let projectInfo = "7e6a" + PosNum + speed + char + Sc2 + "#";
        serial.writeString(projectInfo);
    }

    /**
    * Servo driver blocks   ok!
    * @param Servo which Servo to turn on
    * @param dir which direction to go
    * @param speed how fast
    */
    //% subcategory="Servo"
    //% blockId=Servo_2
    //% block="Servo_360%PosNum|pwm%Sc|速度 %speed"
    //% Sc.min=0 Sc.max=180
    //% speed.min=0 speed.max=9
    export function Servo_180(PosNum: Num, Sc: number, speed: number): void {
        const Sc2 = Sc % 10;
        Sc = Sc / 10 + 48; // ASCII码对应
        const char = asciiToChar(Sc);
        let projectInfo = "7e6a" + PosNum + speed + char + Sc2 + "#";
        serial.writeString(projectInfo);
    }

    /**
        * Motorx1 driver blocks    !ok!
        
        * @param Motorx1 which Motorx1 to turn on
        * @param dir which direction to go
        * @param speed how fast
        */
    //% subcategory="Motor"
    //% blockId=Motorx1
    //% block="Motor%PosNum|转动方向%dir|速度 %speed"
    //% speed.min=0 speed.max=255
    export function Motorx1(PosNum: Num, dir: MotorDh, speed: number): void {
        const speed2 = speed % 10;
        speed = speed / 10 + 48;
        const char = asciiToChar(speed);
        let projectInfo = "7e6b" + PosNum + dir + char + speed2 + "#";
        serial.writeString(projectInfo);
    }

    /**
     * 
     */
    //% weight=10
    //% blockId=kb_event block="%SensorName|%PosNum"
    export function Value(SensorName: Sensor, PosNum: Num): number {
        let value_n = blinkitten_sensor[SensorName][PosNum]
        return value_n
    }

}



