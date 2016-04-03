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

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    
    self.webview.delegate = self;
    NSString* fullURL = @"http://201.200.1.187/inventory/html_client/index.html";
    NSURLRequest* urlRequest = [NSURLRequest requestWithURL:[NSURL URLWithString:fullURL]];

    [self.webview loadRequest:urlRequest];
    
}

- (void)webViewDidFinishLoad:(UIWebView *)theWebView
{
    /*CGSize contentSize = theWebView.scrollView.contentSize;
    CGSize viewSize = theWebView.bounds.size;
    
    float rw = viewSize.width / contentSize.width;
    
    theWebView.scrollView.minimumZoomScale = rw;
    theWebView.scrollView.maximumZoomScale = rw;
    theWebView.scrollView.zoomScale = rw;*/
    
    /*self.webview.scalesPageToFit = YES;
    self.webview.contentMode = UIViewContentModeScaleAspectFit;*/
    
    NSString* jsCommand = [NSString stringWithFormat:@"document.body.style.zoom = 0.3;"];
    [self.webview stringByEvaluatingJavaScriptFromString:jsCommand];

}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
