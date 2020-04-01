//
//  Control.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 31/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//

import Foundation

enum ResponseError: Error {
    case invalidData(description: String)
    case internalError(description: String)
}


struct Control: Codable {
    var success: Bool
    var message: String?
}
