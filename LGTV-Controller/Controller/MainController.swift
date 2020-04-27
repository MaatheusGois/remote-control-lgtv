//
//  ViewController.swift
//  LGTV-Controller
//
//  Created by Matheus Silva on 30/03/20.
//  Copyright © 2020 Matheus Gois. All rights reserved.
//
//  https://www.openhab.org/addons/bindings/lgwebos/
//  https://github.com/merdok/lgtv2/blob/master/README.md


import Cocoa
import Alamofire

class MainController: NSViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }
    
    @IBAction func connect(_ sender: Any) {
        ControlHandler.connect { (response) in
            print(response)
        }
    }
    
    @IBAction func sendButton(_ sender: CustomButtom) {
        ControlHandler.send(button: sender.name)
    }
    
    @IBAction func sendChannel(_ sender: CustomChannel) {
        ControlHandler.send(channel: sender.url)
    }


}
