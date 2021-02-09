
import {createDmgDist} from "./combat.js"

async function drawHistogram() {

    /*---- Load the data ----*/

    let banditDamageDice = {
      num: 2,
      sides: 12,
    }
  
    let banditModifiers = {
      damage: 1,
      hit: 3
    }

    const dataset = createDmgDist(banditDamageDice, banditModifiers)

    console.log(dataset)

    const metricAccessor = d => d.dmg
    const yAccessor = d => d.length

    /*---- Create chart dimensions ----*/
    const width = 600

    let dimensions = {
      width: width,
      height: width * 0.6,
      margin: {
        top: 30,
        right: 10,
        bottom: 50,
        left: 50,
      },
    }
    dimensions.boundedWidth = dimensions.width
      - dimensions.margin.left
      - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom

    dimensions.boundedWidth = dimensions.width
        - dimensions.margin.left
        - dimensions.margin.right
    
    dimensions.boundedHeight = dimensions.height
        - dimensions.margin.top
        - dimensions.margin.bottom
   
    /*---- Draw canvas ----*/
    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
    
    const bounds = wrapper.append("g")
        .style("transform", `translate(${
                dimensions.margin.left
            }px, ${
                dimensions.margin.top
            }px)`)

    /*---- Create scales ----*/
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, metricAccessor))
        .range([0, dimensions.boundedWidth])
        .nice()
    
    const binsGenerator = d3.histogram()
        .domain(xScale.domain())
        .value(metricAccessor)
        .thresholds(12)
    
    const bins = binsGenerator(dataset)
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, yAccessor)])
        .range([dimensions.boundedHeight, 0])
        .nice()

    
    /*---- Draw the data ----*/    
    const binsGroup = bounds.append("g")

    const binGroups = binsGroup.selectAll("g")
      .data(bins)
      .enter().append("g")
  
    const barPadding = 1
    const barRects = binGroups.append("rect")
        .attr("x", d => xScale(d.x0) + barPadding / 2)
        .attr("y", d => yScale(yAccessor(d)))
        .attr("width", d => d3.max([
          0,
          xScale(d.x1) - xScale(d.x0) - barPadding
        ]))
        .attr("height", d => dimensions.boundedHeight
          - yScale(yAccessor(d))
        )
        .attr("fill", "cornflowerblue")

    const mean = d3.mean(dataset, metricAccessor)
    const meanLine = bounds.append("line")
        .attr("x1", xScale(mean))
        .attr("x2", xScale(mean))
        .attr("y1", -15)
        .attr("y2", dimensions.boundedHeight)
        .attr("stroke", "maroon")
        .attr("stroke-dasharray", "2px 4px")
    
    /*---- Draw chart labels ----*/  
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
    
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    
    const xAxisLabel = xAxis.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 10)
        .attr("fill", "black")
        .style("font-size", "1.4em")
        .text("Damage")
        .style("text-transform", "capitalize")
    
    console.log(bins)
}

drawHistogram()