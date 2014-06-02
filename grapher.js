// Generated by CoffeeScript 1.4.0
(function() {
  var Grapher;

  Grapher = (function() {

    function Grapher() {
      this.players = [];
      this.turnCounts = {};
      this.vpTotals = {};
      this.moneyTotals = {};
    }

    Grapher.prototype.reset = function() {
      this.players = [];
      this.turnCounts = {};
      this.vpTotals = {};
      this.moneyTotals = {};
      $.plot($("#money-graph"), []);
      return $.plot($("#vp-graph"), []);
    };

    Grapher.prototype.setPlayers = function(players) {
      if (players.join() !== this.players.join()) {
        this.reset();
        return this.players = players;
      }
    };

    Grapher.prototype.recordMoney = function(player, turn, money) {
      var _base, _base1, _base2, _base3, _ref, _ref1, _ref2, _ref3;
      if ((_ref = (_base = this.moneyTotals)[player]) == null) {
        _base[player] = [0];
      }
      if ((_ref1 = (_base1 = this.turnCounts)[player]) == null) {
        _base1[player] = [];
      }
      if ((_ref2 = (_base2 = this.turnCounts[player])[turn]) == null) {
        _base2[turn] = 0;
      }
      this.turnCounts[player][turn]++;
      if ((_ref3 = (_base3 = this.moneyTotals[player])[turn]) == null) {
        _base3[turn] = 0;
      }
      return this.moneyTotals[player][turn] += money;
    };

    Grapher.prototype.recordVP = function(player, turn, vp) {
      var _base, _base1, _ref, _ref1;
      if ((_ref = (_base = this.vpTotals)[player]) == null) {
        _base[player] = [3];
      }
      if ((_ref1 = (_base1 = this.vpTotals[player])[turn]) == null) {
        _base1[turn] = 0;
      }
      return this.vpTotals[player][turn] += vp;
    };

    Grapher.prototype.updateGraphs = function() {
      var money, moneySeries, player, turn, vp, vpSeries, _base, _i, _j, _len, _ref, _ref1, _ref2, _ref3, _ref4;
      moneySeries = [];
      vpSeries = [];
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        money = [];
        vp = [];
        for (turn = _j = 1; _j <= 30; turn = ++_j) {
          if ((_ref1 = (_base = this.turnCounts)[player]) == null) {
            _base[player] = [];
          }
          if ((_ref2 = this.turnCounts[player][turn]) != null ? _ref2 : 0 > 0) {
            money.push([turn, ((_ref3 = this.moneyTotals[player][turn]) != null ? _ref3 : 0) / this.turnCounts[player][turn]]);
            vp.push([turn, ((_ref4 = this.vpTotals[player][turn]) != null ? _ref4 : 0) / this.turnCounts[player][turn]]);
          }
        }
        moneySeries.push({
          label: player,
          data: money
        });
        vpSeries.push({
          label: player,
          data: vp
        });
      }
      moneySeries[0].color = 2;
      moneySeries[1].color = 1;
      vpSeries[0].color = 2;
      vpSeries[1].color = 1;
      $.plot($("#money-graph"), moneySeries, {
        series: {
          lines: {
            show: true
          },
          points: {
            show: true
          }
        },
        xaxis: {
          min: 0,
          max: 30
        },
        yaxis: {
          min: 0
        },
        legend: {
          position: 'nw'
        }
      });
      return $.plot($("#vp-graph"), vpSeries, {
        series: {
          lines: {
            show: true
          },
          points: {
            show: true
          }
        },
        xaxis: {
          min: 0,
          max: 30
        },
        yaxis: {
          min: 0
        },
        legend: {
          position: 'nw'
        }
      });
    };

    return Grapher;

  })();

  this.Grapher = Grapher;

}).call(this);
