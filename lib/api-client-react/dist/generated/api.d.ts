import type { QueryKey, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { Anomaly, AnomalyAlert, CityEvent, Cohort, CohortAnalysis, CrowdingForecast, DashboardSummary, ExperienceScore, HealthStatus, InfraReportGroup, InfrastructureReport, ListMobilityEventsParams, MobilityEvent, MobilityTrendPoint, TransportSplit, WeatherImpact, Zone, ZoneExperienceScore, ZoneHeatmapPoint, ZoneRanking } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * Returns high-level KPIs for the platform overview
 * @summary Get dashboard KPI summary
 */
export declare const getGetDashboardSummaryUrl: () => string;
export declare const getDashboardSummary: (options?: RequestInit) => Promise<DashboardSummary>;
export declare const getGetDashboardSummaryQueryKey: () => readonly ["/api/dashboard/summary"];
export declare const getGetDashboardSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetDashboardSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getDashboardSummary>>>;
export type GetDashboardSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get dashboard KPI summary
 */
export declare function useGetDashboardSummary<TData = Awaited<ReturnType<typeof getDashboardSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getDashboardSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get hourly mobility trends for the last 7 days
 */
export declare const getGetMobilityTrendsUrl: () => string;
export declare const getMobilityTrends: (options?: RequestInit) => Promise<MobilityTrendPoint[]>;
export declare const getGetMobilityTrendsQueryKey: () => readonly ["/api/dashboard/mobility-trends"];
export declare const getGetMobilityTrendsQueryOptions: <TData = Awaited<ReturnType<typeof getMobilityTrends>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMobilityTrends>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getMobilityTrends>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetMobilityTrendsQueryResult = NonNullable<Awaited<ReturnType<typeof getMobilityTrends>>>;
export type GetMobilityTrendsQueryError = ErrorType<unknown>;
/**
 * @summary Get hourly mobility trends for the last 7 days
 */
export declare function useGetMobilityTrends<TData = Awaited<ReturnType<typeof getMobilityTrends>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getMobilityTrends>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get top zones by activity and experience score
 */
export declare const getGetTopZonesUrl: () => string;
export declare const getTopZones: (options?: RequestInit) => Promise<ZoneRanking[]>;
export declare const getGetTopZonesQueryKey: () => readonly ["/api/dashboard/top-zones"];
export declare const getGetTopZonesQueryOptions: <TData = Awaited<ReturnType<typeof getTopZones>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTopZones>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTopZones>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTopZonesQueryResult = NonNullable<Awaited<ReturnType<typeof getTopZones>>>;
export type GetTopZonesQueryError = ErrorType<unknown>;
/**
 * @summary Get top zones by activity and experience score
 */
export declare function useGetTopZones<TData = Awaited<ReturnType<typeof getTopZones>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTopZones>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get modal split breakdown by transport mode
 */
export declare const getGetTransportSplitUrl: () => string;
export declare const getTransportSplit: (options?: RequestInit) => Promise<TransportSplit[]>;
export declare const getGetTransportSplitQueryKey: () => readonly ["/api/dashboard/transport-split"];
export declare const getGetTransportSplitQueryOptions: <TData = Awaited<ReturnType<typeof getTransportSplit>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransportSplit>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getTransportSplit>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetTransportSplitQueryResult = NonNullable<Awaited<ReturnType<typeof getTransportSplit>>>;
export type GetTransportSplitQueryError = ErrorType<unknown>;
/**
 * @summary Get modal split breakdown by transport mode
 */
export declare function useGetTransportSplit<TData = Awaited<ReturnType<typeof getTransportSplit>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getTransportSplit>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get anomaly alerts overview
 */
export declare const getGetAnomaliesSummaryUrl: () => string;
export declare const getAnomaliesSummary: (options?: RequestInit) => Promise<AnomalyAlert[]>;
export declare const getGetAnomaliesSummaryQueryKey: () => readonly ["/api/dashboard/anomalies-summary"];
export declare const getGetAnomaliesSummaryQueryOptions: <TData = Awaited<ReturnType<typeof getAnomaliesSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAnomaliesSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getAnomaliesSummary>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetAnomaliesSummaryQueryResult = NonNullable<Awaited<ReturnType<typeof getAnomaliesSummary>>>;
export type GetAnomaliesSummaryQueryError = ErrorType<unknown>;
/**
 * @summary Get anomaly alerts overview
 */
export declare function useGetAnomaliesSummary<TData = Awaited<ReturnType<typeof getAnomaliesSummary>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getAnomaliesSummary>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all urban zones
 */
export declare const getListZonesUrl: () => string;
export declare const listZones: (options?: RequestInit) => Promise<Zone[]>;
export declare const getListZonesQueryKey: () => readonly ["/api/zones"];
export declare const getListZonesQueryOptions: <TData = Awaited<ReturnType<typeof listZones>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listZones>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listZones>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListZonesQueryResult = NonNullable<Awaited<ReturnType<typeof listZones>>>;
export type ListZonesQueryError = ErrorType<unknown>;
/**
 * @summary List all urban zones
 */
export declare function useListZones<TData = Awaited<ReturnType<typeof listZones>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listZones>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get zone details
 */
export declare const getGetZoneUrl: (id: number) => string;
export declare const getZone: (id: number, options?: RequestInit) => Promise<Zone>;
export declare const getGetZoneQueryKey: (id: number) => readonly [`/api/zones/${number}`];
export declare const getGetZoneQueryOptions: <TData = Awaited<ReturnType<typeof getZone>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getZone>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getZone>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetZoneQueryResult = NonNullable<Awaited<ReturnType<typeof getZone>>>;
export type GetZoneQueryError = ErrorType<void>;
/**
 * @summary Get zone details
 */
export declare function useGetZone<TData = Awaited<ReturnType<typeof getZone>>, TError = ErrorType<void>>(id: number, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getZone>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get heatmap data for all zones
 */
export declare const getGetZoneHeatmapUrl: () => string;
export declare const getZoneHeatmap: (options?: RequestInit) => Promise<ZoneHeatmapPoint[]>;
export declare const getGetZoneHeatmapQueryKey: () => readonly ["/api/zones/heatmap"];
export declare const getGetZoneHeatmapQueryOptions: <TData = Awaited<ReturnType<typeof getZoneHeatmap>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getZoneHeatmap>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getZoneHeatmap>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetZoneHeatmapQueryResult = NonNullable<Awaited<ReturnType<typeof getZoneHeatmap>>>;
export type GetZoneHeatmapQueryError = ErrorType<unknown>;
/**
 * @summary Get heatmap data for all zones
 */
export declare function useGetZoneHeatmap<TData = Awaited<ReturnType<typeof getZoneHeatmap>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getZoneHeatmap>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List recent mobility events
 */
export declare const getListMobilityEventsUrl: (params?: ListMobilityEventsParams) => string;
export declare const listMobilityEvents: (params?: ListMobilityEventsParams, options?: RequestInit) => Promise<MobilityEvent[]>;
export declare const getListMobilityEventsQueryKey: (params?: ListMobilityEventsParams) => readonly ["/api/mobility-events", ...ListMobilityEventsParams[]];
export declare const getListMobilityEventsQueryOptions: <TData = Awaited<ReturnType<typeof listMobilityEvents>>, TError = ErrorType<unknown>>(params?: ListMobilityEventsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMobilityEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listMobilityEvents>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListMobilityEventsQueryResult = NonNullable<Awaited<ReturnType<typeof listMobilityEvents>>>;
export type ListMobilityEventsQueryError = ErrorType<unknown>;
/**
 * @summary List recent mobility events
 */
export declare function useListMobilityEvents<TData = Awaited<ReturnType<typeof listMobilityEvents>>, TError = ErrorType<unknown>>(params?: ListMobilityEventsParams, options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listMobilityEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get crowding forecast by zone and hour
 */
export declare const getGetCrowdingForecastUrl: () => string;
export declare const getCrowdingForecast: (options?: RequestInit) => Promise<CrowdingForecast[]>;
export declare const getGetCrowdingForecastQueryKey: () => readonly ["/api/mobility-events/crowding-forecast"];
export declare const getGetCrowdingForecastQueryOptions: <TData = Awaited<ReturnType<typeof getCrowdingForecast>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCrowdingForecast>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCrowdingForecast>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCrowdingForecastQueryResult = NonNullable<Awaited<ReturnType<typeof getCrowdingForecast>>>;
export type GetCrowdingForecastQueryError = ErrorType<unknown>;
/**
 * @summary Get crowding forecast by zone and hour
 */
export declare function useGetCrowdingForecast<TData = Awaited<ReturnType<typeof getCrowdingForecast>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCrowdingForecast>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List all citizen behavioral cohorts
 */
export declare const getListCohortsUrl: () => string;
export declare const listCohorts: (options?: RequestInit) => Promise<Cohort[]>;
export declare const getListCohortsQueryKey: () => readonly ["/api/cohorts"];
export declare const getListCohortsQueryOptions: <TData = Awaited<ReturnType<typeof listCohorts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCohorts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCohorts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCohortsQueryResult = NonNullable<Awaited<ReturnType<typeof listCohorts>>>;
export type ListCohortsQueryError = ErrorType<unknown>;
/**
 * @summary List all citizen behavioral cohorts
 */
export declare function useListCohorts<TData = Awaited<ReturnType<typeof listCohorts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCohorts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get cohort behavioral analysis with metrics
 */
export declare const getGetCohortAnalysisUrl: () => string;
export declare const getCohortAnalysis: (options?: RequestInit) => Promise<CohortAnalysis[]>;
export declare const getGetCohortAnalysisQueryKey: () => readonly ["/api/cohorts/analysis"];
export declare const getGetCohortAnalysisQueryOptions: <TData = Awaited<ReturnType<typeof getCohortAnalysis>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCohortAnalysis>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getCohortAnalysis>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetCohortAnalysisQueryResult = NonNullable<Awaited<ReturnType<typeof getCohortAnalysis>>>;
export type GetCohortAnalysisQueryError = ErrorType<unknown>;
/**
 * @summary Get cohort behavioral analysis with metrics
 */
export declare function useGetCohortAnalysis<TData = Awaited<ReturnType<typeof getCohortAnalysis>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getCohortAnalysis>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get experience scores with zone breakdown
 */
export declare const getListExperienceScoresUrl: () => string;
export declare const listExperienceScores: (options?: RequestInit) => Promise<ExperienceScore[]>;
export declare const getListExperienceScoresQueryKey: () => readonly ["/api/experience-scores"];
export declare const getListExperienceScoresQueryOptions: <TData = Awaited<ReturnType<typeof listExperienceScores>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listExperienceScores>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listExperienceScores>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListExperienceScoresQueryResult = NonNullable<Awaited<ReturnType<typeof listExperienceScores>>>;
export type ListExperienceScoresQueryError = ErrorType<unknown>;
/**
 * @summary Get experience scores with zone breakdown
 */
export declare function useListExperienceScores<TData = Awaited<ReturnType<typeof listExperienceScores>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listExperienceScores>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get aggregated experience scores per zone
 */
export declare const getGetExperienceByZoneUrl: () => string;
export declare const getExperienceByZone: (options?: RequestInit) => Promise<ZoneExperienceScore[]>;
export declare const getGetExperienceByZoneQueryKey: () => readonly ["/api/experience-scores/by-zone"];
export declare const getGetExperienceByZoneQueryOptions: <TData = Awaited<ReturnType<typeof getExperienceByZone>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getExperienceByZone>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getExperienceByZone>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetExperienceByZoneQueryResult = NonNullable<Awaited<ReturnType<typeof getExperienceByZone>>>;
export type GetExperienceByZoneQueryError = ErrorType<unknown>;
/**
 * @summary Get aggregated experience scores per zone
 */
export declare function useGetExperienceByZone<TData = Awaited<ReturnType<typeof getExperienceByZone>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getExperienceByZone>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List infrastructure issue reports
 */
export declare const getListInfrastructureReportsUrl: () => string;
export declare const listInfrastructureReports: (options?: RequestInit) => Promise<InfrastructureReport[]>;
export declare const getListInfrastructureReportsQueryKey: () => readonly ["/api/infrastructure-reports"];
export declare const getListInfrastructureReportsQueryOptions: <TData = Awaited<ReturnType<typeof listInfrastructureReports>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInfrastructureReports>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listInfrastructureReports>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListInfrastructureReportsQueryResult = NonNullable<Awaited<ReturnType<typeof listInfrastructureReports>>>;
export type ListInfrastructureReportsQueryError = ErrorType<unknown>;
/**
 * @summary List infrastructure issue reports
 */
export declare function useListInfrastructureReports<TData = Awaited<ReturnType<typeof listInfrastructureReports>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInfrastructureReports>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get infrastructure reports grouped by issue type
 */
export declare const getGetInfraReportsByTypeUrl: () => string;
export declare const getInfraReportsByType: (options?: RequestInit) => Promise<InfraReportGroup[]>;
export declare const getGetInfraReportsByTypeQueryKey: () => readonly ["/api/infrastructure-reports/by-type"];
export declare const getGetInfraReportsByTypeQueryOptions: <TData = Awaited<ReturnType<typeof getInfraReportsByType>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInfraReportsByType>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getInfraReportsByType>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetInfraReportsByTypeQueryResult = NonNullable<Awaited<ReturnType<typeof getInfraReportsByType>>>;
export type GetInfraReportsByTypeQueryError = ErrorType<unknown>;
/**
 * @summary Get infrastructure reports grouped by issue type
 */
export declare function useGetInfraReportsByType<TData = Awaited<ReturnType<typeof getInfraReportsByType>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getInfraReportsByType>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary List upcoming and recent city events
 */
export declare const getListCityEventsUrl: () => string;
export declare const listCityEvents: (options?: RequestInit) => Promise<CityEvent[]>;
export declare const getListCityEventsQueryKey: () => readonly ["/api/city-events"];
export declare const getListCityEventsQueryOptions: <TData = Awaited<ReturnType<typeof listCityEvents>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCityEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listCityEvents>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListCityEventsQueryResult = NonNullable<Awaited<ReturnType<typeof listCityEvents>>>;
export type ListCityEventsQueryError = ErrorType<unknown>;
/**
 * @summary List upcoming and recent city events
 */
export declare function useListCityEvents<TData = Awaited<ReturnType<typeof listCityEvents>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listCityEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get weather conditions and their impact on mobility
 */
export declare const getGetWeatherImpactUrl: () => string;
export declare const getWeatherImpact: (options?: RequestInit) => Promise<WeatherImpact[]>;
export declare const getGetWeatherImpactQueryKey: () => readonly ["/api/weather/impact"];
export declare const getGetWeatherImpactQueryOptions: <TData = Awaited<ReturnType<typeof getWeatherImpact>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWeatherImpact>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof getWeatherImpact>>, TError, TData> & {
    queryKey: QueryKey;
};
export type GetWeatherImpactQueryResult = NonNullable<Awaited<ReturnType<typeof getWeatherImpact>>>;
export type GetWeatherImpactQueryError = ErrorType<unknown>;
/**
 * @summary Get weather conditions and their impact on mobility
 */
export declare function useGetWeatherImpact<TData = Awaited<ReturnType<typeof getWeatherImpact>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof getWeatherImpact>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Get detected mobility anomalies and risk zones
 */
export declare const getListAnomaliesUrl: () => string;
export declare const listAnomalies: (options?: RequestInit) => Promise<Anomaly[]>;
export declare const getListAnomaliesQueryKey: () => readonly ["/api/anomalies"];
export declare const getListAnomaliesQueryOptions: <TData = Awaited<ReturnType<typeof listAnomalies>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnomalies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listAnomalies>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListAnomaliesQueryResult = NonNullable<Awaited<ReturnType<typeof listAnomalies>>>;
export type ListAnomaliesQueryError = ErrorType<unknown>;
/**
 * @summary Get detected mobility anomalies and risk zones
 */
export declare function useListAnomalies<TData = Awaited<ReturnType<typeof listAnomalies>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listAnomalies>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
export {};
//# sourceMappingURL=api.d.ts.map