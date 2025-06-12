def on_received_string(receivedString):
    global tabell, T, p, p1
    serial.redirect_to_usb()
    tabell = receivedString.split("-")
    T = parse_float(tabell[1])
    p = parse_float(tabell[0])
    serial.write_value("p", p)
    serial.write_value("T", T)
    if p1 == 0:
        p1 = p
    serial.write_value("H", finnH(p))
    pxtlora.e32_init(DigitalPin.P9,
        DigitalPin.P8,
        DigitalPin.P16,
        SerialPin.P14,
        SerialPin.P15,
        BaudRate.BAUD_RATE9600,
        False)
pxtlora.on_received_string(on_received_string)

def on_button_pressed_b():
    basic.show_string(pxtlora.e32parameters())
input.on_button_pressed(Button.B, on_button_pressed_b)

def finnH(tall: number):
    global høyde
    høyde = T1 / a * (Math.exp((0 - a) * R / 9.81 * Math.log(p / p1)) - 1)
    return høyde
høyde = 0
T = 0
T1 = 0
tabell: List[str] = []
a = 0
p1 = 0
R = 0
p = 0
pxtlora.e32_init(DigitalPin.P9,
    DigitalPin.P8,
    DigitalPin.P16,
    SerialPin.P14,
    SerialPin.P15,
    BaudRate.BAUD_RATE9600,
    False)
T1 = 297
a = -0.0065
p1 = 0
R = 287.06