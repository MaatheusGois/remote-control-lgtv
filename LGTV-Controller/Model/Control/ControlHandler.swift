//
//  ControlHandler.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 31/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//

import Foundation
import Alamofire

enum ControlResponse: Error {
    case success(Bool)
    case error(ResponseError)
}

struct ControlHandler {
    static public func connect(withCompletion completion: @escaping (ControlResponse) -> Void) {
        let url = Enviroment.SERVER_URL + "/connect"
        let request = AF.request(url)
        
        request.responseJSON { (response) in
            guard let data = response.data else {
                completion(ControlResponse.error(ResponseError.invalidData(description: "Data is null")))
                return
            }
            do {
                let jsonDecoder = JSONDecoder()
                let answer = try jsonDecoder.decode(Control.self, from: data)
                completion(ControlResponse.success(answer.success))
            } catch {
                completion(ControlResponse.error(ResponseError.internalError(description: error.localizedDescription)))
            }
            
        }
    }
    static public func send(button: String) {
        let url = Enviroment.SERVER_URL + "/button/" + button
        let request = AF.request(url)
        request.responseJSON { (response) in
            print(response)
        }
    }
    static public func send(channel: String) {
        let url = Enviroment.SERVER_URL + "/channel"
        let parameters = ["command": channel]
        let request = AF.request(url, method: .post, parameters: parameters)
        request.responseJSON { (response) in
            print(response)
        }
    }
    static public func send(channel: Channel, value: Bool) {
        
    }
    static public func send(channel: Channel, value: Int) {
        
    }
}

