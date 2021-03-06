# Welcome

This plugin was originally authored in 2008 prior to jQuery having built in .data() functionality. This 
repository is being left public for archival purposes. The recommended best practice is to use 
[jQuery's .data()](http://api.jquery.com/data/) method.


# Overview
The dataset plugin provides an easy way to work with html5 data-* attributes.

<div data-first-name="Jonathan" data-last-name="Sharp"></div>

var data = $('div').dataset();
// data will be
{	firstName: 'Jonathan',
	lastName: 'Sharp'
}

Methods provided:

// Return all data elements
$().dataset();

// Read single key
$().dataset('key');

// Set a single key
$().dataset('key', 'value');

// Set multiple keys
$().dataset({
	key1: 'value1',
	key2: 'value2'
});

The dataset plugin also does conversion from dashed attribute names to cameCase.

$().dataset('myKey', 'myvalue') => data-my-key="myvalue"

Additional methods:
$().datasets();

$().removeDataset();

$().datasetFilter();

$().datasetFind();

Filter and find methods take the following arguments:
$().datasetFilter('key', 'value', 'comparison');

Comparison is any valid jQuery attr comparison selector (eg. =, *=, !=, ^=, $=)
