$(document).ready(function(){
    var Form = {
        init: function() {
            this.v_type = $('#v-type');
            this.v_volume = $('#v-volume');
            this.air_stability = $('#air-stability');
            this.air_wind = $('#air-wind');
            this.air_temp = $('#air-temp');
            this.relief = $('#relief');
            this.biome_type = $('#biome-type');
            this.biome_leaves = $('#biome-leaves');
            this.probability = $('#probability');
            this.text_fileds = {
                v_volume: this.v_volume,
                air_wind: this.air_wind,
                air_temp: this.air_temp}
            this.select_fields = {
                v_type: this.v_type,
                air_stability: this.air_stability,
                relief: this.relief,
                biome_type: this.biome_type,
                biome_leaves: this.biome_leaves,
                probability: this.probability}
        },
        reset: function() {
            for (var field in this.text_fileds) {
                this[field].val('')
            };
            for (var field in this.select_fields) {
                var first_option = this[field].children('option').first().val();
                this[field].val(first_option)
            }
        },
        get_results: function() {
            var self = this,
                results = {};
            for (var field in this.text_fileds) {
                var value = parseFloat(this[field].val());
                if ( isNaN(value) ) {
                    return {error: "Не введено: " + this[field].attr('aria-label')}
                };
                results[field] = value
            };
            for (var field in this.select_fields) {
                results[field] = this[field].val()
            };
            return {data: results}
        }
    };

    var View = {
        init: function() {
            this.error = $('#error');
            this.form_container = $('#input-form');
            this.results_container = $('#calculation-results');
            this.results = $('#results');
            this.animation_time = 200; // milliseconds
        },
        show_form: function() {
            var self = this;
            this.results_container.fadeOut(this.animation_time, function(){
                self.hide_error();
                self.results.empty();
                self.form_container.fadeIn(this.animation_time)
            })
        },
        show_results: function(results){
            var self = this;
            this.hide_error();
            this.form_container.fadeOut(this.animation_time, function(){
                self.results.empty();

                for (var i in results) {
                    var result = results[i];
                    $('<tr>')
                        .append( $('<td>').addClass('col-7 col-sm-12').text(result.name) )
                        .append( $('<td>').addClass('col-5 col-sm-12').text(result.value) )
                        .appendTo(self.results);
                };

                self.results_container.fadeIn(this.animation_time)
            });


        },
        show_error: function(text) {
            this.error.text(text).fadeIn(this.animation_time)
        },
        hide_error: function(text) {
            this.error.empty().fadeOut(this.animation_time)
        }
    };

    var Calculator = {
        init: function() {
            if (this.initialized) {
                return; // Do not init twice
            };
            this.initialized = 1;
            var self = this;

            Form.init();
            View.init();

            /* Bind events */

            $('#do-calculate').click(function(){
                var form_results = Form.get_results();

                if (form_results.error) {
                    View.show_error(form_results.error);
                    return
                };

                var calculation_results = self.calculate(form_results.data);
                View.show_results(calculation_results)
            });

            $('#do-reset').click(function(){
                Form.reset();
                View.hide_error()
            });

            $('#do-show-form').click(function(){
                View.show_form()
            })
        },
        calculate: function(results){
            var calculation_results = [];

            /* Do some calculation here */

            for (var field in results) {
                calculation_results.push({name: field, value: results[field]})
            };

            return calculation_results
        }
    };

    Calculator.init()  // Start
});
