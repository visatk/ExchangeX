import { 
  sqliteTable, 
  integer, 
  text, 
  real, 
  index, 
  uniqueIndex, 
  sqliteView 
} from 'drizzle-orm/sqlite-core';
import { relations, sql } from 'drizzle-orm';

// --------------------------------------------------------
// Table: content
// --------------------------------------------------------
export const content = sqliteTable('content', {
  contentId: integer('content_id').primaryKey({ autoIncrement: true }),
  language: text('language').notNull().default(''),
  name: text('name').notNull().default(''),
  linkTitle: text('link_title').notNull().default(''),
  title: text('title').notNull().default(''),
  description: text('description'),
  pageLocation: text('page_location').notNull().default(''),
  pageUrl: text('page_url').notNull().default(''),
  metaDescription: text('meta_description').notNull().default(''),
  metaKeywords: text('meta_keywords').notNull().default(''),
  status: text('status').notNull().default('active'),
  modified: text('modified').notNull(),
});

// --------------------------------------------------------
// Table: gateways
// --------------------------------------------------------
export const gateways = sqliteTable('gateways', {
  gatewayId: integer('gateway_id').primaryKey({ autoIncrement: true }),
  gatewayName: text('gateway_name').notNull().default(''),
  logo: text('logo').notNull().default(''),
  accountId: text('account_id').notNull().default(''),
  apiKey: text('api_key').notNull().default(''),
  secretKey: text('secret_key').notNull().default(''),
  otherVal: text('other_val').notNull().default(''),
  otherVal2: text('other_val2').notNull().default(''),
  otherVal3: text('other_val3').notNull().default(''),
  otherVal4: text('other_val4').notNull().default(''),
  otherVal5: text('other_val5').notNull().default(''),
  gatewayDescription: text('gateway_description').notNull(),
  website: text('website').notNull().default(''),
  status: text('status', { enum: ['active', 'inactive'] }).notNull().default('active'),
  added: text('added').notNull(),
});

// --------------------------------------------------------
// Table: currencies
// --------------------------------------------------------
export const currencies = sqliteTable('currencies', {
  currencyId: integer('currency_id').primaryKey({ autoIncrement: true }),
  gatewayId: integer('gateway_id').notNull().references(() => gateways.gatewayId).default(0),
  currencyName: text('currency_name').notNull().default(''),
  currencyCode: text('currency_code').notNull().default(''),
  image: text('image').notNull().default(''),
  isCrypto: integer('is_crypto', { mode: 'boolean' }).notNull().default(false),
  reserve: text('reserve').notNull().default('0'),
  minReserve: text('min_reserve').notNull().default('0'),
  fee: text('fee').notNull().default('0'),
  instructions: text('instructions').notNull(),
  website: text('website').notNull().default(''),
  siteCode: text('site_code').notNull().default(''),
  xmlCode: text('xml_code').notNull().default(''),
  allowSend: integer('allow_send', { mode: 'boolean' }).notNull().default(false),
  allowReceive: integer('allow_receive', { mode: 'boolean' }).notNull().default(false),
  allowAffiliate: integer('allow_affiliate', { mode: 'boolean' }).notNull().default(false),
  defaultSend: integer('default_send', { mode: 'boolean' }).notNull().default(false),
  defaultReceive: integer('default_receive', { mode: 'boolean' }).notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  isNewCurrency: integer('is_new_currency', { mode: 'boolean' }).notNull().default(false),
  hideCode: integer('hide_code', { mode: 'boolean' }).notNull().default(false),
  currCode: text('curr_code').notNull().default(''),
  status: text('status', { enum: ['active', 'inactive'] }).notNull().default('active'),
  added: text('added').notNull(),
}, (table) => ({
  statusIdx: index('currency_status_idx').on(table.status),
}));

// --------------------------------------------------------
// Table: users
// --------------------------------------------------------
export const users = sqliteTable('users', {
  userId: integer('user_id').primaryKey({ autoIncrement: true }),
  userGroup: integer('user_group', { mode: 'boolean' }).notNull().default(false),
  username: text('username').notNull().unique().default(''),
  password: text('password').notNull().default(''),
  email: text('email').notNull().unique().default(''),
  fname: text('fname').notNull().default(''),
  lname: text('lname').notNull().default(''),
  gender: text('gender').notNull().default(''),
  address: text('address').notNull().default(''),
  address2: text('address2').notNull().default(''),
  city: text('city').notNull().default(''),
  state: text('state').notNull().default(''),
  zip: text('zip').notNull().default(''),
  country: text('country').notNull().default('0'),
  phone: text('phone').notNull().default(''),
  paymentMethod: text('payment_method').notNull().default(''),
  regSource: text('reg_source').notNull().default(''),
  refId: text('ref_id').notNull().default(''),
  discount: integer('discount', { mode: 'boolean' }).notNull().default(false),
  newsletter: integer('newsletter', { mode: 'boolean' }).notNull().default(false),
  ip: text('ip').notNull().default(''),
  verifiedEmail: integer('verified_email', { mode: 'boolean' }).notNull().default(false),
  verifiedPhone: integer('verified_phone', { mode: 'boolean' }).notNull().default(false),
  verifiedDocument: text('verified_document').notNull().default(''),
  verifiedAddress: text('verified_address').notNull().default(''),
  verificationProgress: text('verification_progress').notNull().default(''),
  githubId: text('github_id').notNull().default(''),
  googleId: text('google_id').notNull().default(''),
  status: text('status', { enum: ['active', 'inactive'] }).notNull().default('active'),
  authProvider: text('auth_provider').notNull().default(''),
  authUid: text('auth_uid').notNull().default(''),
  activationKey: text('activation_key').notNull().default(''),
  unsubscribeKey: text('unsubscribe_key').notNull().default(''),
  loginSession: text('login_session').notNull().default(''),
  lastLogin: text('last_login').notNull(),
  loginCount: integer('login_count').notNull().default(0),
  lastIp: text('last_ip').notNull().default(''),
  created: text('created').notNull(),
  blockReason: text('block_reason'),
}, (table) => ({
  githubIdx: index('github_id_idx').on(table.githubId),
  googleIdx: index('google_id_idx').on(table.googleId),
}));

// --------------------------------------------------------
// Table: exdirections
// --------------------------------------------------------
export const exdirections = sqliteTable('exdirections', {
  exdirectionId: integer('exdirection_id').primaryKey({ autoIncrement: true }),
  fromCurrency: integer('from_currency').notNull().references(() => currencies.currencyId),
  toCurrency: integer('to_currency').notNull().references(() => currencies.currencyId),
  fromRate: text('from_rate').notNull().default('0'),
  toRate: text('to_rate').notNull().default('0'),
  exchangeRate: text('exchange_rate').notNull().default('0'),
  fee: text('fee').notNull().default('0'),
  minAmount: text('min_amount').notNull().default('0'),
  maxAmount: text('max_amount').notNull().default('0'),
  userInstructions: text('user_instructions').notNull(),
  description: text('description').notNull(),
  isManual: integer('is_manual', { mode: 'boolean' }).notNull().default(false),
  hideFromVisitors: integer('hide_from_visitors', { mode: 'boolean' }).notNull().default(false),
  allowAffiliate: integer('allow_affiliate', { mode: 'boolean' }).notNull().default(false),
  autoRate: integer('auto_rate', { mode: 'boolean' }).notNull().default(false),
  todayExchanges: integer('today_exchanges').notNull().default(0),
  totalExchanges: integer('total_exchanges').notNull().default(0),
  sortOrder: integer('sort_order').notNull().default(0),
  status: text('status', { enum: ['active', 'inactive'] }).notNull().default('active'),
  added: text('added').notNull(),
  updated: text('updated').notNull(),
  lastExchangeDate: text('last_exchange_date').notNull(),
});

// --------------------------------------------------------
// Table: exchanges
// --------------------------------------------------------
export const exchanges = sqliteTable('exchanges', {
  exchangeId: integer('exchange_id').primaryKey({ autoIncrement: true }),
  exdirectionId: integer('exdirection_id').notNull().references(() => exdirections.exdirectionId),
  userId: integer('user_id').notNull().references(() => users.userId),
  referenceId: text('reference_id').notNull().default(''),
  fromCurrencyId: integer('from_currency_id').notNull().references(() => currencies.currencyId),
  toCurrencyId: integer('to_currency_id').notNull().references(() => currencies.currencyId),
  fromCurrency: text('from_currency').notNull().default('0'),
  toCurrency: text('to_currency').notNull().default('0'),
  exFromRate: text('ex_from_rate').notNull().default('0'),
  exToRate: text('ex_to_rate').notNull().default('0'),
  exchangeRate: text('exchange_rate').notNull().default('0'),
  exchangeAmount: real('exchange_amount').notNull().default(0.0000),
  receiveAmount: real('receive_amount').notNull().default(0.0000),
  exchangeFee: text('exchange_fee').notNull(),
  fromAccount: text('from_account'),
  toAccount: text('to_account'),
  clientEmail: text('client_email').notNull().default(''),
  clientDetails: text('client_details'),
  proof: text('proof').notNull().default(''),
  refId: text('ref_id').notNull().default('0'),
  countryCode: text('country_code', { length: 2 }).notNull().default(''),
  status: text('status').notNull().default(''),
  reason: text('reason'),
  notificationSent: integer('notification_sent', { mode: 'boolean' }).notNull().default(false),
  created: text('created').notNull(),
  updated: text('updated').notNull(),
  processDate: text('process_date').notNull(),
}, (table) => ({
  referenceIdx: uniqueIndex('exchange_ref_idx').on(table.referenceId),
  userStatusIdx: index('exchange_user_status_idx').on(table.userId, table.status),
}));

// --------------------------------------------------------
// Table: transactions
// --------------------------------------------------------
export const transactions = sqliteTable('transactions', {
  transactionId: integer('transaction_id').primaryKey({ autoIncrement: true }),
  referenceId: text('reference_id').notNull().default(''),
  userId: integer('user_id').notNull().references(() => users.userId),
  refId: integer('ref_id').notNull().default(0),
  paymentType: text('payment_type').notNull().default(''),
  paymentMethod: integer('payment_method').notNull().default(0),
  paymentDetails: text('payment_details'),
  transactionAmount: real('transaction_amount').notNull().default(0.0000),
  transactionCommision: real('transaction_commision').notNull().default(0.0000),
  amount: real('amount').notNull().default(0.0000),
  status: text('status').notNull().default(''),
  reason: text('reason'),
  notificationSent: integer('notification_sent', { mode: 'boolean' }).notNull().default(false),
  created: text('created').notNull(),
  updated: text('updated').notNull(),
  processDate: text('process_date').notNull(),
}, (table) => ({
  referenceIdx: uniqueIndex('transaction_ref_idx').on(table.referenceId),
  userIdx: index('transaction_user_idx').on(table.userId),
}));

// --------------------------------------------------------
// Table: reviews
// --------------------------------------------------------
export const reviews = sqliteTable('reviews', {
  reviewId: integer('review_id').primaryKey({ autoIncrement: true }),
  exchangeId: integer('exchange_id').notNull().references(() => exchanges.exchangeId),
  userId: integer('user_id').notNull().references(() => users.userId),
  author: text('author').notNull().default(''),
  reviewTitle: text('review_title').notNull().default(''),
  rating: integer('rating').notNull().default(0),
  review: text('review'),
  status: text('status', { enum: ['active', 'pending', 'inactive'] }).notNull().default('active'),
  added: text('added').notNull(),
  updated: text('updated').notNull(),
}, (table) => ({
  statusIdx: index('review_status_idx').on(table.status),
}));

// --------------------------------------------------------
// Remaining Generic Tables
// --------------------------------------------------------
export const countries = sqliteTable('countries', { /* ... omitted for brevity, same as before ... */ 
  countryId: integer('country_id').primaryKey({ autoIncrement: true }),
  code: text('code', { length: 2 }).notNull().default(''),
  name: text('name', { length: 100 }).notNull().default(''),
  currency: text('currency', { length: 3 }).notNull().default(''),
  signup: integer('signup', { mode: 'boolean' }).notNull().default(true),
  sortOrder: integer('sort_order').notNull().default(0),
  status: text('status', { enum: ['active', 'inactive'] }).notNull().default('active'),
});

export const pmethods = sqliteTable('pmethods', {
  pmethodId: integer('pmethod_id').primaryKey({ autoIncrement: true }),
  pmethodTitle: text('pmethod_title').notNull().default(''),
  minAmount: real('min_amount').notNull().default(0.0000),
  commission: text('commission').notNull().default(''),
  pmethodDetails: text('pmethod_details'),
  status: text('status', { enum: ['active', 'inactive'] }).notNull().default('active'),
});

export const settings = sqliteTable('settings', {
  settingId: integer('setting_id').primaryKey({ autoIncrement: true }),
  settingKey: text('setting_key').notNull().unique().default(''),
  settingValue: text('setting_value'),
});

// --------------------------------------------------------
// Drizzle Relations (Relations API v2)
// --------------------------------------------------------
export const usersRelations = relations(users, ({ many }) => ({
  exchanges: many(exchanges),
  transactions: many(transactions),
  reviews: many(reviews),
}));

export const exchangesRelations = relations(exchanges, ({ one }) => ({
  user: one(users, {
    fields: [exchanges.userId],
    references: [users.userId],
  }),
  direction: one(exdirections, {
    fields: [exchanges.exdirectionId],
    references: [exdirections.exdirectionId],
  }),
}));

export const exdirectionsRelations = relations(exdirections, ({ one }) => ({
  fromCurrency: one(currencies, {
    fields: [exdirections.fromCurrency],
    references: [currencies.currencyId],
  }),
  toCurrency: one(currencies, {
    fields: [exdirections.toCurrency],
    references: [currencies.currencyId],
  }),
}));

// --------------------------------------------------------
// Drizzle Views (SQLite Native Views)
// --------------------------------------------------------
export const userExchangeDashboardView = sqliteView('user_exchange_dashboard').as((qb) => 
  qb.select({
    exchangeId: exchanges.exchangeId,
    referenceId: exchanges.referenceId,
    userName: sql<string>`${users.fname} || ' ' || ${users.lname}`.as('user_name'),
    userEmail: users.email,
    fromCurrency: exchanges.fromCurrency,
    toCurrency: exchanges.toCurrency,
    exchangeAmount: exchanges.exchangeAmount,
    status: exchanges.status,
  })
  .from(exchanges)
  .leftJoin(users, sql`${exchanges.userId} = ${users.userId}`)
);
