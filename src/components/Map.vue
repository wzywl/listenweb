<template>
  <div id="map">
  </div>
</template>
<script>
 export default {
  data() {
    return {
      productList: [
	{
	  lng: 122.131901,
	  lat: 29,
	  speed: 10
	},
	{
	  lng: 123,
	  lat: 30,
	  speed: 20
	}
      ]	
    }
  },
  methods: {
    loadmap() {
      var map = new BMap.Map('map')
      var pointstart = new BMap.Point(this.productList[0].lng,this.productList[0].lat)
      map.centerAndZoom(pointstart,7)
      map.addControl(new BMap.NavigationControl())
      map.addControl(new BMap.ScaleControl())
      map.addControl(new BMap.OverviewMapControl())
      map.enableScrollWheelZoom(true)
      this.markerstart(pointstart,map)
      for(let i = 0;i < this.productList.length - 1;i++) {
	let pend = new BMap.Point(this.productList[i + 1].lng,this.productList[i + 1].lat)
	setTimeout(this.markerend,(i + 1) * 400,pend,map,i)
	setTimeout(this.drawline,(i + 1) * 400,map,i)
	setTimeout(this.clearmarker,(i + 1) * 400,map,i)
      }
    },
    markerstart(point,mapinit) {
      var markerstart = new BMap.Marker(point)
      mapinit.addOverlay(markerstart)
    },
    drawline(mapinit,dr) {
      var polyline = new BMap.Polyline([
	new BMap.Point(this.productList[dr].lng,this.productList[dr].lat),
	new BMap.Point(this.productList[dr + 1].lng,this.productList[dr + 1].lat)
      ],
      {
	strokeColor: 'red',strokeWeight: 6,strokeOpacity: 0.5 
      }
      )
      mapinit.addOverlay(polyline)
    },
    markerend(point,mapinit,dr) {
      var pointIcon = new BMap.Icon('http://www.nihaotop.com/img/ship@2x.png',
      new BMap.Size(100,40),
      {
	anchor: new BMap.Size(27,13)
      })
      var markerend = new BMap.Marker(point,{icon: pointIcon})
      markerend.imei = dr + 1
      mapinit.addOverlay(markerend)
      markerend.addEventListener('click',(() => {
	alert(this.productList[dr + 1].speed)
      }))
    },
    clearmarker(mapinit,dr) {
      var clear = mapinit.getOverlays()
      for(let i = 0;i < clear.length;i++) {
	if(clear[i].imei == dr) {
	  mapinit.removeOverlay(clear[i])
	}
      }
    }
  },
  mounted() {
    this.loadmap()
  },
 }
</script>
<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
