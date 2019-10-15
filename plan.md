## What pages will need to be created?

1. Main pages with the selection porcess. 
2. display results page. 

## What data will need to be saved, updated, and when?

1. Image data (25 items)
2. Items to display
4. Items previously displayed 
5. Saved selected item for results
6. The quantity of an item that is displayed (must be less than 2). 
7. Items that were viewed and now viewed. 

## What variables will need to be used to track data?

1. Set up an array to store all the product images. 
2. Set global variables: 
    A. Global Click Counter
    B. Track previously shown products so new products can be generated
    C. Generate element for click event
    D. The table of products
    E. The table of selected prodcuts
    F. Products Votes
    G. Products Shown
    H. Product Names
    I. Maximum Votes (25). 


## STRETCH data will need to be saved to local storage?

User product vote tally 

## What rules exist and what algorithms (flow charts) need to be defined?

    1. No dups in each selection 
    2. No dups from a preceding set. 

    * Flow chart:* 
    1. user chosses prodcut -> selection is tracked -> 
    2. new product display -> return to step one until 25 products have been selected. 