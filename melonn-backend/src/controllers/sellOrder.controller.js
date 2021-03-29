const SellOrder = require('../models/SellOrder')
const moment = require('moment')
const fetch = require('node-fetch');
const { get } = require('../routes');

module.exports = {
    async createSellOrder(req, res){
        try {

            const sellOrderData = req.body;

            const { shippingMethod } = sellOrderData
            const { lineItems } = sellOrderData;

            const getDay = moment().format('YYYY-MM-DD')

            const internalON = getDay + '-' + Math.floor(Math.random() * 100)

            /* Obtiene los dias Off */
            const response = await fetch('https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/off-days', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT'
                }
            })
            const data = await response.json()

            /* Obtiene las reglas por id del Shipping Method*/ 
            const retShipMethod = await fetch(`https://yhua9e1l30.execute-api.us-east-1.amazonaws.com/sandbox/shipping-methods/${shippingMethod}`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'oNhW2TBOlI1t4kWb3PEad1K1S1KxKuuI3GX6rGvT'
                }
            })
            const retShipMethodData = await retShipMethod.json();

            /* Valida si es un dia laboral */
            const isBusinessDay = (day) => {
                if(!data.includes(day)){
                    return true;
                } else {
                    return false
                }
            }

            /* Obtiene los proximos 10 dias laborales */
            const allBusinessDays = () => {
                let busDays = []
                let i = 0;
                do {
                    let days = moment().add(i, 'days').format('YYYY-MM-DD')
                    if(!data.includes(days)){
                        busDays.push(days)
                    }
                    i++
                } while (busDays.length < 10);
                return busDays;
            }

            /* Funcion para crear con parametros nulos */
            const createWithNullParameters = async() => {
                const sellOrder = await SellOrder.create({
                    ...sellOrderData,
                    pack_promise_min: null,
                    pack_promise_max: null,
                    ship_promise_min: null,
                    ship_promise_max: null,
                    delivery_pickup_promise_min: null,
                    delivery_pickup_promise_max: null,
                    ready_pickup_promise_min: null,
                    ready_pickup_promise_max: null,
                    internalOrderNumber: internalON
                })
    
                return res.status(201).json({
                    msg: 'Sell order create successfully',
                    sellOrder
                })
            }

            const totalWeigthArray = lineItems.map(item => {
                return item.productWeigth * item.productQty
            })

            /* Obtener el peso total de todos los items */
            const totalWeigthItems = totalWeigthArray.reduce((acc,number) => {
                return acc + number
            }, 0)

            const dayType = retShipMethodData.rules.availability.byRequestTime.dayType;
            const fromTimeOfDay = retShipMethodData.rules.availability.byRequestTime.fromTimeOfDay;
            const toTimeOfDay = retShipMethodData.rules.availability.byRequestTime.toTimeOfDay;
            const actualHour = moment().hour();

            /* Calcular las promesas de los casos */
            const promisesCases = (hour, methodData) => {
                if(hour >= fromTimeOfDay && hour <= toTimeOfDay){
                    for (let i = 0; i < methodData.rules.promisesParameters.cases.length; i++) {
                        const priority = methodData.rules.promisesParameters.cases[i].priority;
                        const dayType = methodData.rules.promisesParameters.cases[i].condition.byRequestTime.dayType;
                        const fromTimeOfDayCondition = methodData.rules.promisesParameters.cases[i].condition.byRequestTime.fromTimeOfDay;
                        const toTimeOfDayCondition = methodData.rules.promisesParameters.cases[i].condition.byRequestTime.toTimeOfDay;
                        const minType = methodData.rules.promisesParameters.cases[i].packPromise.min.type;
                        const minDeltaHours = methodData.rules.promisesParameters.cases[i].packPromise.min.deltaHours;
                        const maxType = methodData.rules.promisesParameters.cases[i].packPromise.max.type;
                        const maxDeltaBusinessDays = methodData.rules.promisesParameters.cases[i].packPromise.max.deltaBusinessDays;
                        const maxTimeOfDay = methodData.rules.promisesParameters.cases[i].packPromise.max.timeOfDay;
                        switch (dayType) {
                            case 'ANY':
                                if(hour >= fromTimeOfDayCondition && hour <= toTimeOfDayCondition){
                                    // const minTotal = minTypeCalculate(minType, minDeltaHours)
                                    // console.log(minTotal); 
                                    console.log('Min Hours');
                                }
                                break;
                            case 'BUSINESS':
                                if(isBusinessDay()){
                                    if(hour >= fromTimeOfDayCondition && hour <= toTimeOfDayCondition){
                                        // const minTotal = minTypeCalculate(minType, minDeltaHours)
                                        // console.log(minTotal);
                                        console.log('Min Hours Business');
                                    }else {
                                        break;
                                    }
                                }
                                else{
                                    break;
                                }
                            default:
                                break;
                        }
                    }
                } else {
                    createWithNullParameters()
                }
            }

            /* Calculo según el minType */
            const minTypeCalculate = (minType, minDeltaHours) => {
                const packPromiseMin = ''
                switch (minType) {
                    case '':
                        packPromiseMin = null
                        return packPromiseMin;
                        break;
                    case 'DELTA-HOURS':
                        packPromiseMin = minDeltaHours
                        return packPromiseMin;
                        break;
                    default:
                        break;
                }
            }

            /* Segun el calculo del peso total hacemos el algortimo */
            if(totalWeigthItems >= retShipMethodData.rules.availability.byWeight.min && totalWeigthItems <= retShipMethodData.rules.availability.byWeight.max){
                switch (dayType) {
                    case 'BUSINESS':
                        if(isBusinessDay(getDay)){
                            promisesCases(actualHour, retShipMethodData)
                        } else {
                            createWithNullParameters()
                        }
                        break;
                    case 'ANY':
                        promisesCases(actualHour, retShipMethodData)
                    default:
                        break;
                }
            } else {
                createWithNullParameters()
            }

        } catch (error) {
            throw error(`Error while creating a new sell order: ${error}`)
        }
    },

    async getSellOrders(req, res){
        try {
            
            const getSellOrders = await SellOrder.find()

            return res.status(200).json({
                msg: 'Query executed successfully',
                getSellOrders
            })

        } catch (error) {
            throw error(`Error while getting the orders: ${error}`)
        }
    },

    async getSellOrderById(req, res){

        const {sellOrderId} = req.params;

        try {

            const sellOrderInfo = await SellOrder.findById(sellOrderId);
            return res.status(200).json({
                msg: 'Query executed successfully',
                sellOrderInfo
            })

        } catch (error) {
            return res.status(400).json({
                message: `Order with id ${sellOrderId} does not exists`
            })
        }
    }
}