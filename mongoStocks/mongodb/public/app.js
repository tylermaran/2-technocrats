// Set the cursor on the search bar
$("#inlineFormCustomSelect").focus();

// Create table variable and header
var table = $("<table>");
table.addClass("table");
var tableHead = $("<thead>");
var tableRow = $("<tr>");
// Create column names
tableRow.append($("<th scope='col'>Symbol</th>"));
tableRow.append($("<th scope='col'>Name</th>"));
tableRow.append($("<th scope='col'>Exchange</th>"));
tableRow.append($("<th scope='col'>Current Price</th>"));
tableRow.append($("<th scope='col'>$ Change</th>"));
tableRow.append($("<th scope='col'>% Change</th>"));

tableHead.append(tableRow);
table.append(tableHead);
var tableBody = $("<tbody>");
tableBody.addClass("tableBody");
table.append(tableBody);
$(".stockInfo").append(table);

// On click function for searching for new stocks *******************************
$("#submit").on("click", function () {
  var ticker = ($("#inlineFormCustomSelect")[0].value)
  // Using a RegEx Pattern to format the ticker symbol
  ticker = ticker.replace(/\s+/g, "").toUpperCase();
  console.log(ticker);

  // Get request to the stock api for the searched ticker
  $.get("/api/" + ticker, function (data) {
    // Just grab the ticker portion of the URL - drop the '/api/'
    var ticker = this.url.substr(5);
    // if successful, create object with values
    if (data[ticker] != undefined) {
      var stock = {
        symbol: data[ticker].quote.symbol,
        name: data[ticker].quote.companyName,
        exchange: data[ticker].quote.primaryExchange,
        currentPrice: data[ticker].quote.close,
        dollarChange: data[ticker].quote.change,
        percentChange: (data[ticker].quote.changePercent * 100).toFixed(2) + '%'
      }
      // Create new row for each search
      var tableRow = $("<tr>");
      tableRow.addClass(data[ticker].quote.symbol);
      tableRow.addClass("table-row");
      tableRow.attr("value", data[ticker].quote.symbol);
      // ***********************************************************
      tableRow.on("click", function () {

        var tickerSelected = $(this).attr("value");

        var purchaseBox = $("<div>");
        purchaseBox.addClass("purchase-box");
        var message = $("<div>");
        message.text("Purchase " + tickerSelected + "?");

        var form = $("<form>");
        form.addClass("form-inline");

        var inputForm = $("<input>");
        inputForm.addClass("form-control");
        inputForm.attr("type", "text");
        inputForm.attr("id", "buyform");
        inputForm.attr("placeholder", "Number of shares");

        var button = $("<button>");
        button.attr("type", "button");
        button.addClass("btn btn-primary");
        button.attr("id", "orderButton");

        button.text("Buy");
        // ***********************************************************
        button.on("click", function () {
          var numberShares = $("#buyform").val();

          console.log(numberShares);
          console.log(tickerSelected);

          var transaction = {
            numberShares: numberShares,
            tickerSelected: tickerSelected
          }
          $.ajax({
              method: "POST",
              url: "/buy",
              data: transaction
            })
            // With that done
            .then(function (data) {
              // Log the response
              console.log(data);
              // Empty the notes section
            });

        });
        // ***********************************************************

        form.append(message);
        form.append(inputForm);
        form.append(button);
        purchaseBox.append(form);

        $(".purchaseStock").html(purchaseBox);

      });
      // For each property in the Stock object, add data to the row
      for (var property in stock) {
        tableRow.append($("<td>" + stock[property] + "</td>"));
      }
      // Append row to table body, clear search box, and reposition cursor
      $(".tableBody").append(tableRow);
      $("#inlineFormCustomSelect").val("");
      $("#inlineFormCustomSelect").focus();
    } else {
      console.log("Not found");
    }
  });
});
// ******************************************************************************