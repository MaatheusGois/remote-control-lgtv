//
//  Envoriment.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 30/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//

import Foundation

struct Enviroment {
    public static let PRODUCTION: Bool = false
    public static var SERVER_URL: String {
        let serverLocalURL = "http://localhost:6767"
        let serverOnlineURL = ""
        return PRODUCTION ? serverOnlineURL : serverLocalURL
    }
}
