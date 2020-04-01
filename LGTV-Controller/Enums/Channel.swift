//
//  Channel.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 31/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//

import Foundation

enum Channel: String {
    case power = "ssap://system/turnOff"
    case mute = "ssap://audio/setMute"
    case volumeUp = "ssap://audio/volumeUp"
    case volumeDown = "ssap://audio/volumeDown"
    case channelUp = "ssap://tv/channelUp"
    case channelDown = "ssap://tv/channelDown"
}
