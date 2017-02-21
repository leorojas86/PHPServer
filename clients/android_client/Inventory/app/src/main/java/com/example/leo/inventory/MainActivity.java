package com.example.leo.inventory;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.*;
import android.net.*;
import android.content.*;

public class MainActivity extends AppCompatActivity
{

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView webView = (WebView)findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        webView.setWebViewClient(new WebViewClient());

        //webView.addJavascriptInterface(new JSInterface(this), "external");
//webView.loadUrl("http://google.com");

        SetWebChromeClient(webView);

        webView.loadUrl("http://201.200.1.187/inventory/html_client");
    }

    private void SetWebChromeClient(WebView webView)
    {
        //webView.setWebChromeClient(new WebChromeClient());

        webView.setWebChromeClient(new WebChromeClient());
    }
}
