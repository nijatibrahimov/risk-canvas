window.addEventListener("load", function () {

  const riskFields = document.querySelectorAll('.risk-field')

  riskFields.forEach(field => {
    const dataSetRiskPercent = field.getAttribute('data-risk-percent')
    riskPercentage(field, dataSetRiskPercent, 80, 120)
  })


  function riskPercentage(field, riskPercent, canvasHeight, canvasWidth) {

    let riskPositionY = canvasHeight - (riskPercent * canvasHeight / 100);
    riskPositionX = riskPercent * canvasWidth / 100;

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
    ctx.moveTo(0, 20)
    ctx.lineTo(300, 20)
    ctx.moveTo(0, 40)
    ctx.lineTo(300, 40)
    ctx.moveTo(0, 60)
    ctx.lineTo(300, 60)
    ctx.moveTo(30, 0)
    ctx.lineTo(30, canvasHeight)
    ctx.moveTo(60, 0)
    ctx.lineTo(60, canvasHeight)
    ctx.moveTo(90, 0)
    ctx.lineTo(90, canvasHeight)
    ctx.strokeStyle = '#000000'
    ctx.stroke()

    // ctx.beginPath()
    // ctx.lineWidth = 1
    // ctx.moveTo(0, canvasHeight)
    // ctx.lineTo(riskPositionX, riskPositionY)
    // ctx.strokeStyle = '#dd9933'
    // ctx.stroke()

    ctx.beginPath()
    ctx.arc(riskPositionX, riskPositionY, 4, 0, 10, false)
    ctx.fillStyle = '#42505C'
    ctx.fill()

    ctx.beginPath
    ctx.fillStyle = '#42505C'
    ctx.font = '18px'
    ctx.fillText(`${riskPercent}%`, riskPositionX + 4, riskPositionY - 4)
  }

})