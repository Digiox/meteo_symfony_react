<?php

namespace App\Service;

use Psr\Log\LoggerInterface;

use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpClient\HttpClient;

$dotenv = new Dotenv();
$dotenv->load(__DIR__.'\..\..\.env');

// You can also load several files


class FetchWeatherApi
{
    private $client;
    private $apiKey;

    public function __construct()
    {   
        $this->client = HttpClient::create();
        $this->apiKey = $_ENV['DARK_SKY_API_KEY'];
       
    }

    /**
     * @return array
     */
    public function getApiData($log, $lat, $lng, $city)
    {
        
      
            $response = $this->client->request('GET', 'https://api.darksky.net/forecast/' . $this->apiKey . '/'. $lat . ',' . $lng . '?lang=fr&units=ca');
       
       
  
        $content = $response->toArray();
        
        $log->info(gettype($content{'currently'}{'summary'}));
        return [
            'temperature' => $content{'currently'}{'temperature'}, // en °C
            'vent' => $content{'currently'}{'windSpeed'},
            'icon' => $content{'currently'}{'icon'},
            'summary' => $content{'currently'}{'summary'},
            'lat' => $lat,
            'lng' => $lng,
            'city' => $city
        ];
    }
}
