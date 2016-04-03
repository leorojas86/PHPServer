//
//  ViewController.m
//  Inventory
//
//  Created by Leo on 3/29/16.
//  Copyright © 2016 Leo. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    NSString* fullURL = @"http://google.com";
    NSURLRequest* urlRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:fullURL]];
    [self.webview loadRequest:urlRequest];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
