window.addEventListener("load", function () {

  const riskFields = document.querySelectorAll('.risk-field')

  riskFields.forEach(field => {
    const dataSetRiskPercent = field.getAttribute('data-risk-percent')

    let fieldWidth = field.offsetWidth;
    let fieldHeight = field.offsetHeight;

    riskPercentage(field, dataSetRiskPercent, fieldHeight, fieldWidth)
  })


  function riskPercentage(field, riskPercent, canvasHeight, canvasWidth) {

    let riskPositionY = canvasHeight - (riskPercent * canvasHeight / 100);
    let riskPositionX = riskPercent * canvasWidth / 100;

    field.height = canvasHeight;
    field.width = canvasWidth;

    const ctx = field.getContext('2d')

    const thresholdCount = 4
    const thresholdNumber = 25

    const thresholdArea = document.createElement('div')
    thresholdArea.classList.add('threshold-area')

    for (let i = 0; i < thresholdCount; i++) {
      let thresholdNewNumber = i * thresholdNumber

      const thresholdTag = document.createElement('span')
      thresholdTag.classList.add('threshold')
      thresholdTag.style.lineHeight = canvasHeight / thresholdCount + 'px'

      const thresholdTagDatas = document.createTextNode(thresholdNewNumber)

      thresholdTag.appendChild(thresholdTagDatas)
      thresholdArea.appendChild(thresholdTag)

      field.parentNode.insertBefore(thresholdArea, field)
    }


    const bgGradient = ctx.createLinearGradient(25, canvasWidth, canvasWidth, -25)
    bgGradient.addColorStop(0, "#85c784")
    bgGradient.addColorStop(0.5, "#dae839")
    bgGradient.addColorStop(1, "#ff8310")

    ctx.fillStyle = bgGradient
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    ctx.lineWidth = 0.1
    ctx.beginPath()
    ctx.moveTo(0, canvasHeight / thresholdCount)
    ctx.lineTo(canvasWidth, canvasHeight / thresholdCount)
    ctx.moveTo(0, canvasHeight / thresholdCount * 2)
    ctx.lineTo(canvasWidth, canvasHeight / thresholdCount * 2)
    ctx.moveTo(0, canvasHeight / thresholdCount * 3)
    ctx.lineTo(canvasWidth, canvasHeight / thresholdCount * 3)
    ctx.moveTo(canvasWidth / thresholdCount, 0)
    ctx.lineTo(canvasWidth / thresholdCount, canvasHeight)
    ctx.moveTo(canvasWidth / thresholdCount * 2, 0)
    ctx.lineTo(canvasWidth / thresholdCount * 2, canvasHeight)
    ctx.moveTo(canvasWidth / thresholdCount * 3, 0)
    ctx.lineTo(canvasWidth / thresholdCount * 3, canvasHeight)
    ctx.strokeStyle = '#121212'
    ctx.stroke()

    // ctx.beginPath()
    // ctx.lineWidth = 1
    // ctx.moveTo(0, canvasHeight)
    // ctx.lineTo(riskPositionX, riskPositionY)
    // ctx.strokeStyle = '#dd9933'
    // ctx.stroke()

    ctx.beginPath()
    ctx.arc(riskPositionX, riskPositionY, 3, 0, 2 * Math.PI)
    ctx.fillStyle = '#121212'
    ctx.stroke()
    ctx.fill()

    ctx.beginPath
    ctx.font = "small-caps 600 0.86rem Poppins";
    ctx.fillStyle = '#121212'
    ctx.fillText(`${riskPercent}%`, riskPositionX + 4, riskPositionY - 4)
  }

})