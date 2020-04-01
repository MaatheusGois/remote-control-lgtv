//
//  NSButton.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 31/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//

import Cocoa

class CustomButtom: NSButton {
    var name: String = ""
}

@IBDesignable extension CustomButtom {
    @IBInspectable var buttonName: String {
        set {
            name = newValue
        }
        get {
            return name
        }
    }
}


class CustomChannel: NSButton {
    var url: String = ""
}

@IBDesignable extension CustomChannel {
    @IBInspectable var channelName: String {
        set {
            url = newValue
        }
        get {
            return url
        }
    }
}
