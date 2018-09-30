<template>
    <div>
        <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>Trechos</BreadcrumbItem>
        </Breadcrumb>
        <Card :padding="24">
            <Timeline>
                <TimelineItem>
                    <p class="time">09/09/2018</p>
                    <p class="content">Dourados - MS</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">08/09/2018</p>
                    <p class="content">Navirai, MS</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">07/09/2018</p>
                    <p class="content">Mundo Novo, MS</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">06/09/2018</p>
                    <p class="content">Cascavel, PR</p>
                </TimelineItem>
                <TimelineItem>
                    <p class="time">05/09/2018</p>
                    <p class="content">Foz do Iguaçu, PR</p>
                </TimelineItem>
            </Timeline>
        </Card>
    </div>
</template>
<script>
    export default {
        
    }
</script>
<style scoped>
    .time{
        font-size: 14px;
        font-weight: bold;
    }
    .content{
        padding-left: 5px;
    }
</style>