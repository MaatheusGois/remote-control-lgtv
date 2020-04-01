//
//  String.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 31/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//

import Foundation
import Alamofire

extension String {
    func convertSpecialCharacters() -> String
    {
        var newString = self
        let arrayEncode = ["&", "<", ">", "\"", "'", "-", "..."]
        for (escaped_char) in arrayEncode {
            newString = newString.encode(escaped_char)
        }
        return newString.replacingOccurrences(of: " ", with: "%20")
    }
    func encode(_ chars: String) -> String
    {
        let forbidden = CharacterSet(charactersIn: chars)
        return self.addingPercentEncoding(withAllowedCharacters: forbidden.inverted) ?? self
    }
}

extension String: ParameterEncoding {

    public func encode(_ urlRequest: URLRequestConvertible, with parameters: Parameters?) throws -> URLRequest {
        var request = try urlRequest.asURLRequest()
        request.httpBody = data(using: .utf8, allowLossyConversion: false)
        return request
    }

}
