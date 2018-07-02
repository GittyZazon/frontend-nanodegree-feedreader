/* eslint-disable */

//some tests require DOM manipulation, load first
$(function() {
    
    //tests pertaining to the RSS Feed and array allFeeds
    describe('RSS Feeds', function() {
        /* confirms allFeeds array exists and contains at
         * least one feed
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* confirms each feed in allFeeds array contains URL and
         * that the URL is not empty
         */
        it('has a URL', function() {
         	for(const feed of allFeeds){
                expect(feed.url).toBeDefined();
                expect(feed.url).toContain('http://');
            }
        });

        /* confirms each feed in allFeeds array contains name attr
         * and that there is some string for name
         */
        it('has a name', function() {
        	for(const feed of allFeeds){
                expect(feed.name).toBeDefined();
                expect(feed.name).toContain('');
            }
        })
    });

    //Test suite for the hidden menu
    describe('The menu', function(){

        //is side menu hidden by default
        it('menu default hidden', function(){
        	expect($('body')).toHaveClass('menu-hidden');
        });

        // does menu change visibility on click
        it('toggles display', function(){
        	$('.menu-icon-link').trigger('click');
        	expect($('body')).not.toHaveClass('menu-hidden');
        	$('.menu-icon-link').trigger('click');
        	expect($('body')).toHaveClass('menu-hidden');
        });
    });
    
    //Test suite regarding initial load
    describe('Initial Entries', function(){
        
        //is the original feed loading asynchronously and properly
        beforeEach(function(done){
        	loadFeed(0, function(){
        		done();
        	});
        });

        it('has an initial entry', function(done){
        	expect($('.feed').find('.entry').length).not.toBe(0);
        	done();
        });
    });

    //Test suite for link click-through
    describe('New Feed Selection', function(){
        
        //array to hold and compare feeds
        let feeds = [];
        //are the feeds changing when the link is clicked
        beforeEach(function(done){
        	loadFeed(0, function() {
        	   feeds.push($('.feed').text())
                loadFeed(1, function() {
                    feeds.push($('.feed').text())
                    done();
                });
            });
        });
        
        it('changes content', function(done) {
        	expect(feeds[0]).not.toEqual(feeds[1]);
        	done();
        });
    });
}());
