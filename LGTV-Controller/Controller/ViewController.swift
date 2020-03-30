//
//  ViewController.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 30/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//

import Cocoa
import Alamofire

class ViewController: NSViewController {
    
    @IBOutlet weak var textField: NSTextField!
    
    var urlString: String {
        
        return Enviroment.SERVER_URL + "/connect/" + textField.stringValue.convertSpecialCharacters()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    @IBAction func request(_ sender: Any) {
        let request = AF.request(urlString)
        request.responseJSON { (response) in
            print(response)
        }
    }
}





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
