function SendDataPC () {
    serial.redirectToUSB()
    serial.writeValue("Callsign", callSign)
    serial.writeValue("Teller", teller)
    serial.writeValue("Temp", T)
    serial.writeValue("Trykk", p)
    if (p1 == 0) {
        p1 = p
    }
    serial.writeValue("Ax", Ax)
    serial.writeValue("Ay", Ay)
    serial.writeValue("Az", Az)
    serial.writeValue("Mx", Mx)
    serial.writeValue("My", My)
    serial.writeValue("Mz", Mz)
    serial.writeValue("Hoyde", beregneHøyde(p))
}
pxtlora.onReceivedString(function (receivedString) {
    dataSett = receivedString
    organisereData()
    SendDataPC()
    sendDataOLED()
    pxtlora.e32Init(
    DigitalPin.P9,
    DigitalPin.P8,
    DigitalPin.P16,
    SerialPin.P14,
    SerialPin.P15,
    BaudRate.BaudRate9600,
    false
    )
})
input.onButtonPressed(Button.B, function () {
    basic.showString(pxtlora.e32parameters())
})
function sendDataOLED () {
    kitronik_VIEW128x64.show("Temperatur: " + T + " C", 1)
    kitronik_VIEW128x64.show("Trykk: " + p + " Pa", 2)
    kitronik_VIEW128x64.show("Høyde: " + H + " m", 3)
}
function organisereData () {
    tabell = dataSett.split("-")
    callSign = parseFloat(tabell[0])
    teller = parseFloat(tabell[1])
    T = parseFloat(tabell[2])
    p = parseFloat(tabell[3])
    Ax = parseFloat(tabell[4])
    Ay = parseFloat(tabell[5])
    Az = parseFloat(tabell[6])
    Mx = parseFloat(tabell[7])
    My = parseFloat(tabell[8])
    Mz = parseFloat(tabell[9])
}
function beregneHøyde (tall: number) {
    H = Math.round(T1 / a * (Math.exp((0 - a) * R / 9.81 * Math.log(p / p1)) - 1) * 10) / 10
    return H
}
let tabell: string[] = []
let H = 0
let dataSett = ""
let Mz = 0
let My = 0
let Mx = 0
let Az = 0
let Ay = 0
let Ax = 0
let p1 = 0
let p = 0
let T = 0
let teller = 0
let callSign = 0
let a = 0
let T1 = 0
T1 = 297
a = -0.0065
let R = 287.06
pxtlora.e32Init(
DigitalPin.P9,
DigitalPin.P8,
DigitalPin.P16,
SerialPin.P14,
SerialPin.P15,
BaudRate.BaudRate9600,
false
)
