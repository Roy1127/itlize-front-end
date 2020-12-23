export const getPlainFeatures = structuredFea => 
    // eslint-disable-next-line no-sequences
    structuredFea.reduce((obj, item) => (obj[item.feature] = item.value, obj), {});

export const getPlainDatasource = structuredSrc => ({
    key: structuredSrc.id,
    creationTime: structuredSrc.creationTime,
    ...getPlainFeatures(structuredSrc.features)
});

export const parseDatasources = structuredSrcs => 
    structuredSrcs.map(ele => getPlainDatasource(ele));


export const getNewFeature = prevFeature => ({
    title: prevFeature.feature,
    dataIndex: prevFeature.feature,
    editable: true
});

export const parseFeatures = preFeatures => 
    preFeatures.map(ele => getNewFeature(ele));

export const createColumns = structuredSrcs => 
    parseFeatures(structuredSrcs[0].features);
