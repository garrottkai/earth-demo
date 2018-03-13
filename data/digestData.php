<?php

/*

This is a script to provide the input data for the visualization.
It opens the source CSV and converts it to a more easily readable format for display.

Author: Kai Garrott <garrottkai@gmail.com>

*/

$fileName = 'MOD_NDVI_16_2018-02-18_rgb_360x180.CSV';


// CSV parser for the specifically formatted data files used here
function parseFile(string $fileName): string {

    $file = file_get_contents($fileName);

    $lines = preg_split('/\r\n|\r|\n/', $file);

    $processed = [];

    $lat = -89.5;

    foreach($lines as $line) {
        $long = -179.5;
        $procLine = [];
        $values = explode(',', $line);
        foreach($values as $value) {
            if($value != 99999.0) {
                $coords = $lat . "," . $long . "," . $value . "\n";
                array_push($procLine, $coords);
            }
            $long += 1;
        }
        $processed = array_merge($processed, $procLine);
        $lat += 1;
    }
    return(implode($processed));
}

function writeFile(string $data): void {
    $file = fopen('data.csv', 'w');
    fwrite($file, $data);
    fclose($file);
}

try {
    $output = parseFile($fileName);
    writeFile($output);
} catch(Exception $exception) {
    echo $exception->getMessage;
}
