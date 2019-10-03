<?php
namespace App\Controller;
header('Content-Type: application/json; charset=utf-8');

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\FetchWeatherApi;
use Psr\Log\LoggerInterface;
use Symfony\Component\HttpFoundation\Response;



class WeatherController extends AbstractController
{
    

    public function __construct(FetchWeatherApi $weather, LoggerInterface $log)
    {
      
        

    }

    
    /**
     * @Route("/", name="weather")
     */
    public function index(FetchWeatherApi $weather, LoggerInterface $log, Request $request)
    {   $lat = "43.600000";
        $lng = "1.433333";
        $city = "Toulouse";
        if ($request->query->get('lat')) {
            $lat = $request->query->get('lat');
            $lng = $request->query->get('lng');
            $city = $request->query->get('city');;
        }
       
        $log -> info('LAAAAAT' . $lat);
        
        // echo($weather->getApiData()["summary"]);
        $lat = $weather->getApiData($log, $lat, $lng, $city)["lat"];
        $lng = $weather->getApiData($log, $lat, $lng, $city)["lng"];
      
       $log->info($weather->getApiData($log, $lat, $lng, $city)["lat"]);
        
        return $this->render('dashboard/index.html.twig', [
        'wind' => $weather->getApiData($log, $lat, $lng, $city)["vent"],
        'temp' => $weather->getApiData($log, $lat, $lng, $city)["temperature"],
        'icon' => $weather->getApiData($log, $lat, $lng, $city)["icon"],
        'summary' => $weather->getApiData($log, $lat, $lng, $city)["summary"],
        'city' => $weather->getApiData($log, $lat, $lng, $city)["city"]]);
    }
   
}
